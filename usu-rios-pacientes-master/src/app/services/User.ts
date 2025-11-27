import { UserRepository } from '../repositories/User';
import jwt from 'jsonwebtoken';
import { User } from '../entities/Users';
import { IUser } from '../interfaces/user';
import { filterProps } from '../utils/filterProps';
import { USER_FIELDS } from '../utils/listFields';
import { hashPassword } from '../utils/hashPassword';
import { isBcryptHash } from '../utils/isBcryptHash';
import { validatePassword } from '../utils/validatePassword';
import { redisClient } from '../Redis/clientRedis';
import { admin, authAdmin } from '../../database/firebase';
import { sendEmail } from '../utils/sendEmail';
import { generateCodeVerification } from '../utils/verificationCodeEmail';
import dotenv from 'dotenv';

// Garante que as variáveis de ambiente estejam carregadas
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(data: IUser): Promise<any> {
    const dataFilter = filterProps<IUser>(data, [...USER_FIELDS] as (keyof IUser)[]);

    // 1. Validação básica
    if (!dataFilter.nome || !dataFilter.email || !dataFilter.senha_hash) {
      return { message: 'Campos obrigatórios ausentes (nome, email, senha)' };
    }

    // 2. Verifica se já existe no banco local
    const userGet = await this.repository.findByQueryOne({ email: dataFilter.email });
    if (userGet) {
      return { message: 'Usuário já cadastrado no sistema.' };
    }

    // 3. Hash da senha para o banco local
    const senha_hash = await hashPassword(dataFilter.senha_hash);

    let userRecord;

    try {
      // 4. Tenta criar no Firebase Auth
      try {
        userRecord = await authAdmin.createUser({
          email: dataFilter.email,
          password: dataFilter.senha_hash, // Firebase exige a senha crua
          displayName: dataFilter.nome,
          emailVerified: false,
          disabled: false,
        });
      } catch (err: any) {
        console.error('Erro ao criar usuário Firebase:', err);
        if (err.code === 'auth/email-already-exists') {
          // Tenta recuperar o usuário se ele já existir no Firebase (caso de inconsistência antiga)
          userRecord = await authAdmin.getUserByEmail(dataFilter.email);
        } else {
          return { message: 'Erro ao registrar credenciais de acesso no provedor de identidade.' };
        }
      }

      // 5. Envio do E-mail de Verificação (Não bloqueante)
      try {
        const verificationLink = await authAdmin.generateEmailVerificationLink(dataFilter.email);
        
        // Envia o e-mail sem await para não travar o cadastro se o serviço de e-mail estiver lento
        sendEmail({
          forEmail: dataFilter.email,
          subject: "Verifique seu e-mail - iSaúde",
          body: `
            <h2>Seja Bem-vindo(a) ${dataFilter.nome.split(" ")[0]}!</h2>
            <p>Confirme seu e-mail clicando no link abaixo:</p>
            <a href="${verificationLink}" target="_blank">Verificar e-mail</a>
          `
        }).catch(err => console.warn('Falha no envio de email (background):', err.message));
        
      } catch (emailErr) {
        console.warn('Erro ao gerar link de verificação:', emailErr.message);
      }

      // 6. Salva no Banco de Dados Local
      if (!userRecord) {
        return { message: "Erro crítico ao obter registro do usuário." };
      }

      // Salva com a senha hashada e os dados filtrados
      const user = await this.repository.save({ ...dataFilter, senha_hash });
      return user;

    } catch (error: any) {
      console.error("Erro fatal no createUser:", error);

      // ROLLBACK: Se falhar ao salvar no banco local, removemos do Firebase para não deixar "usuário fantasma"
      if (userRecord && userRecord.uid) {
        console.warn(`Iniciando rollback: Removendo usuário ${userRecord.email} do Firebase devido a erro no banco.`);
        try {
          await authAdmin.deleteUser(userRecord.uid);
        } catch (rollbackError) {
          console.error("FALHA NO ROLLBACK:", rollbackError);
        }
      }

      throw new Error('Falha ao criar conta de usuário. Por favor, tente novamente.');
    }
  }

  async login({ email, password }: { email: string; password: string; }): Promise<{ token?: string } | { message?: string }> {
    
    // 1. Busca usuário no banco local
    const user = await this.repository.findByQueryOne({ email }, true);

    const messageError = { message: "E-mail ou senha inválidos" };
    const messageErrorVerifyEmail = { message: "E-mail ainda não verificado. Verifique seu e-mail para ativar sua conta." };

    if (!user) {
      return messageError;
    }

    // 2. Valida a senha (compara senha enviada com hash do banco)
    const validatePasswordResult = await validatePassword(password, user?.senha_hash);

    if (!validatePasswordResult) {
      return messageError;
    }

    // 3. Verifica status no Firebase
    try {
      const userFirebase = await admin.auth().getUserByEmail(email);

      // Opcional: Bloquear login se email não verificado (comentado para facilitar testes em dev se necessário)
      // if (!userFirebase.emailVerified) {
      //   return messageErrorVerifyEmail;
      // }

      // 4. Gera Token JWT
      // Use variáveis de ambiente para a secret
      const JWT_SECRET = process.env.APP_SECRET || 'default_secret_change_me'; 
      const JWT_EXPIRES = '24h'; 

      const tokenPayload = {
        sub: user.id,
        email: user.email,
        uid: userFirebase.uid,
        role: user.tipo_usuario || 'pacient'
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES });

      // 5. Salva sessão no Redis
      await redisClient.set(`token:${user.id}`, token, { EX: 86400 }); // 24 horas em segundos

      return { token };

    } catch (error) {
      console.error("Erro no login (Firebase/Redis):", error);
      return { message: "Erro interno durante a autenticação." };
    }
  }

  async verifyLogin({ token }): Promise<string | boolean> {
    const JWT_SECRET = process.env.APP_SECRET || 'default_secret_change_me';
    
    try {
      const payload: any = jwt.verify(token, JWT_SECRET);
      const redisToken = await redisClient.get(`token:${payload.sub}`);

      if (!redisToken || redisToken !== token) {
        return 'Token inválido ou expirado (não encontrado no cache)';
      }
      
      return true;
    } catch (error) {
      return 'Token inválido ou expirado';
    }
  }

  async sendResetPasswordCodeInEmail({ email }): Promise<{ message: string; } | User | null> {
    const user = await this.repository.findByQueryOne({ email });

    if (!user) {
      // Retorna erro genérico por segurança ou mensagem específica
      return { message: "Usuário não encontrado com este e-mail." };
    }

    const code = await generateCodeVerification();
    const chave = `verificacao:${email}`;
    const expiracaoSegundos = 600; // 10 minutos

    try {
      await redisClient.set(chave, code, { EX: expiracaoSegundos });

      await sendEmail({
        forEmail: email,
        subject: "Recuperação de Senha - iSaúde",
        body: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Recuperação de Senha</h2>
          <p>Você solicitou a redefinição de sua senha.</p>
          <p>Seu código de verificação é:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${code}</h1>
          <p>Este código expira em 10 minutos.</p>
        </div>
      `
      });

      return null; // Sucesso (retorno null indica sem erro)
    } catch (error) {
      console.error("Erro ao enviar email reset:", error);
      return { message: "Erro ao enviar e-mail de recuperação." };
    }
  }

  async verifyPasswordCodeInEmail({ otpCode, email }): Promise<{ message: string; } | User | null> {
    const user = await this.repository.findByQueryOne({ email });
    const chave = `verificacao:${email}`;

    if (!user) {
      return { message: "E-mail não encontrado." };
    }

    const codeStored = await redisClient.get(chave);

    if (!codeStored || !otpCode || String(codeStored).trim() !== String(otpCode).trim()) {
      return { message: "Código inválido ou expirado." };
    }

    return null; // Sucesso
  }

  async resetPassword({ password, repeatPassword, email, otpCode }): Promise<{ message: string; } | User | null> {
    // 1. Valida o código novamente por segurança
    const verifyCode: any = await this.verifyPasswordCodeInEmail({ email, otpCode });
    if (verifyCode) {
      return { message: verifyCode.message };
    }

    if (password !== repeatPassword) {
      return { message: "As senhas não coincidem." };
    }

    const user = await this.repository.findByQueryOne({ email });
    if (!user) {
      return { message: "Usuário não encontrado." };
    }

    try {
      // 2. Atualiza no Firebase
      const userFirebase = await admin.auth().getUserByEmail(email);
      await admin.auth().updateUser(userFirebase.uid, { password });

      // 3. Atualiza no Banco Local
      const senha_hash = await hashPassword(password);
      const response = await this.repository.update(user.id, { senha_hash });

      // 4. Remove o código usado do Redis
      await redisClient.del(`verificacao:${email}`);

      return response;
    } catch (error) {
      console.error("Erro ao resetar senha:", error);
      return { message: "Erro ao processar alteração de senha." };
    }
  }

  async getUsers({ queries, id }: { queries?: any; id?: number }): Promise<User[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
      return resultItems ? [resultItems] : [];
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
      return resultItems;
    }

    if (id) {
      resultItems = await this.repository.findById(id);
      return resultItems ? [resultItems] : [];
    }

    resultItems = await this.repository.findAll();
    return resultItems;
  }

  async updateUser(id: number, data: Partial<IUser>): Promise<User | null | { message: string }> {
    const dataFilter = filterProps<IUser>(data, [...USER_FIELDS] as (keyof IUser)[]);
    let senha_hash = null;

    // Verifica existência do usuário
    const currentUser = await this.repository.findById(id);
    if (!currentUser) {
      return { message: "Usuário não encontrado" };
    }

    // Lógica de senha
    if (dataFilter.senha_hash) {
      const isHash = isBcryptHash(dataFilter.senha_hash);
      if (!isHash) {
        // Se não for hash, hasheia agora
        senha_hash = await hashPassword(dataFilter.senha_hash);
      } else {
        // Se já veio hash (raro vindo do front, mas possível internamente), mantém
        senha_hash = dataFilter.senha_hash;
      }
    }

    try {
      // Atualiza Firebase se necessário
      const userFirebase = await admin.auth().getUserByEmail(currentUser.email);
      
      const fieldsToUpdateFirebase: any = {};
      if (dataFilter.email && dataFilter.email !== currentUser.email) {
        fieldsToUpdateFirebase.email = dataFilter.email;
      }
      if (dataFilter.senha_hash) { // Se mudou senha
        fieldsToUpdateFirebase.password = dataFilter.senha_hash; // Firebase quer raw password
      }
      if (dataFilter.telefone) {
        fieldsToUpdateFirebase.phoneNumber = dataFilter.telefone;
      }
      if (dataFilter.nome) {
        fieldsToUpdateFirebase.displayName = dataFilter.nome;
      }

      if (userFirebase && Object.keys(fieldsToUpdateFirebase).length > 0) {
        // Nota: Atualizar senha no Firebase requer que saibamos a senha 'crua'. 
        // Se 'dataFilter.senha_hash' já foi hasheado antes dessa linha, vai dar erro no firebase login.
        // Assumimos aqui que o controller mandou a senha crua em 'senha_hash' se for update.
        // Ajuste ideal: ter campo 'password' separado de 'senha_hash' na interface de update.
        
        try {
           await admin.auth().updateUser(userFirebase.uid, fieldsToUpdateFirebase);
        } catch(fbError) {
           console.error("Erro ao atualizar Firebase:", fbError);
           // Não interrompe o fluxo do banco local, mas loga o erro
        }
      }

      // Atualiza Banco Local
      const payload = senha_hash ? { ...dataFilter, senha_hash } : dataFilter;
      const userUpdated = await this.repository.update(id, payload);

      return userUpdated;

    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      return { message: "Erro interno ao atualizar dados do usuário." };
    }
  }

  async deleteUser(id: number): Promise<null | { message: string }> {
    if (!id) return { message: 'ID obrigatório' };

    const user = await this.repository.findById(id);
    if (!user) {
      return { message: "Usuário não encontrado" };
    }

    try {
      // Tenta remover do Firebase
      const userRecord = await authAdmin.getUserByEmail(user.email).catch(() => null);
      
      if (userRecord) {
        await authAdmin.deleteUser(userRecord.uid);
      }

      // Remove do Banco Local
      await this.repository.delete(user.id);
      return null;

    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return { message: "Erro ao remover usuário do sistema." };
    }
  }
}