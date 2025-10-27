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

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(data: IUser): Promise<any> {
    const dataFilter = filterProps<IUser>(data, [...USER_FIELDS] as (keyof IUser)[]);

    if (
      !dataFilter.nome ||
      !dataFilter.email ||
      !dataFilter.senha_hash
    ) {
      return { message: 'Campos obrigatórios ausentes' };
    }

    const userGet = await this.repository.findByQueryOne({ email: dataFilter.email });
    if (userGet) {
      return { message: 'Usuário já Cadastrado' };
    }

    const senha_hash = await hashPassword(dataFilter.senha_hash);

    let userRecord;
    try {
      userRecord = await authAdmin.createUser({
        email: dataFilter.email,
        password: dataFilter.senha_hash,
        emailVerified: false,
        disabled: false,
      });
    } catch (err) {
      console.error('Erro ao criar usuário Firebase:', err);
      throw new Error('Erro ao criar usuário no Firebase');
    }

    try {
      const verificationLink = await authAdmin.generateEmailVerificationLink(dataFilter.email);

      await sendEmail({
        forEmail: dataFilter.email,
        subject: "Verifique seu e-mail",
        body: `
      <h2>Seja Bem-vindo ${dataFilter.nome.split(" ")[0]}!</h2>
      <p>Confirme seu e-mail clicando no link abaixo:</p>
      <a href="${verificationLink}">Verificar e-mail</a>
    `
      });
    } catch (err) {
      console.warn('Erro ao enviar link de verificação:', err.message);
    }

    if (
      !userRecord
    ) {
      return { message: "Erro no cadastro de usuário" }
    }

    const user = await this.repository.save({ ...dataFilter, senha_hash });
    return user;
  }

  async login({ email, password }: { email: string; password: string; }): Promise<{ token?: string } | { message?: string }> {

    const user = await this.repository.findByQueryOne({ email }, true)

    const messageError = { message: "Email ou senha inválidos" }
    const messageErrorVerifyEmail = { message: "E-mail ainda não verificado. Verifique seu e-mail para ativar sua conta." }

    if (!user) {
      return messageError
    }

    const validatePasswordResult = await validatePassword(password, user?.senha_hash)

    if (!validatePasswordResult) {
      return messageError
    }

    const userFirebase = await admin.auth().getUserByEmail(email)

    if (!userFirebase.emailVerified) {
      return messageErrorVerifyEmail;
    }

    const JWT_SECRET = 'sua-chave-secreta';
    const JWT_EXPIRES = '1h';

    const mockUser = {
      id: user.id,
      email: user.email,
      uid: userFirebase.uid
    };

    const token = jwt.sign({ sub: mockUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    await redisClient.set(`token:${mockUser.id}`, token, { EX: 3600 });

    return { token }
  }

  async verifyLogin({ token }): Promise<string | boolean> {
    const JWT_SECRET = 'sua-chave-secreta';
    const payload = jwt.verify(token, JWT_SECRET);
    const redisToken = await redisClient.get(`token:${payload.sub}`);

    if (redisToken !== token) return 'Token inválido ou expirado';
    return true;
  }

  async sendResetPasswordCodeInEmail({ email }): Promise<{ message: string; } | User | null> {
    const user = await this.repository.findByQueryOne({ email });

    const messageError = { message: "Erro desconhecido, tente novamente mais tarde" }

    if (!user) {
      return messageError;
    }

    const code = await generateCodeVerification();
    const chave = `verificacao:${email}`;
    const expiracaoSegundos = 600; // 10 minutos

    await redisClient.set(chave, code, { EX: expiracaoSegundos });

    await sendEmail({
      forEmail: email,
      subject: "Resetar Senha",
      body: `
      <h2>Resetar a Senha  !</h2>
      <p>Codigo de verificação: ${code} </p>
    `
    });

    return null;
  }

  async verifyPasswordCodeInEmail({ otpCode, email }): Promise<{ message: string; } | User | null> {
    const user = await this.repository.findByQueryOne({ email });
    const chave = `verificacao:${email}`;

    if (!user) {
      return { message: "Erro desconhecido, tente novamente mais tarde" }
    }

    const code = await redisClient.get(chave);

    if (!otpCode || code != otpCode) {
      return { message: "Código Inválido" }
    }

    return null
  }

  async resetPassword({ password, repeatPassword, email, otpCode }): Promise<{ message: string; } | User | null> {
    const user = await this.repository.findByQueryOne({ email });

    const messageError = { message: "Usuário não encontrado" }
    const messageErrorPassword = { message: "Senhas não coincidem" }

    const verifyCode: any = await this.verifyPasswordCodeInEmail({ email, otpCode })

    if (verifyCode) {
      return { message: verifyCode.message };
    }

    if (!user) {
      return messageError;
    }

    if (password !== repeatPassword) {
      return messageErrorPassword;
    }

    const senha_hash = await hashPassword(password);

    const userFirebase = await admin.auth().getUserByEmail(email)

    await admin.auth().updateUser(userFirebase.uid, {
      password,
    });

    const response = await this.repository.update(user.id, { senha_hash });

    return response;
  }

  async getUsers({ queries, id }: { queries?: any; id?: number }): Promise<User[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
      return resultItems;
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repository.findAll();
    return resultItems;
  }

  async updateUser(id: number, data: Partial<IUser>): Promise<User | null | { message: string }> {
    const dataFilter = filterProps<IUser>(data, [...USER_FIELDS] as (keyof IUser)[]);
    let senha_hash = null;

    if (
      !dataFilter.nome ||
      !dataFilter.email
    ) {
      return { message: 'Campos obrigatórios ausentes' }
    }

    const isHashBcrypt = await dataFilter?.senha_hash ? isBcryptHash(dataFilter?.senha_hash || '') : null

    if (dataFilter.senha_hash && !isHashBcrypt) {
      delete dataFilter.senha_hash
    }

    else if (dataFilter.senha_hash && isHashBcrypt) {
      senha_hash = await hashPassword(dataFilter.senha_hash);
    }

     const resultItemsUser = await this.repository.findByQueryOne({ id });

    const userFirebase = await admin.auth().getUserByEmail(resultItemsUser.email)

    const fieldsToUpdate: any = {};
    if (dataFilter.email) fieldsToUpdate.email = dataFilter.email;
    if (dataFilter.senha_hash) fieldsToUpdate.password = dataFilter.senha_hash;
    if (dataFilter.telefone) fieldsToUpdate.phoneNumber = dataFilter.telefone;

    if (userFirebase && Object.keys(fieldsToUpdate).length > 0) {
      await admin.auth().updateUser(userFirebase.uid, fieldsToUpdate);
    }

    const user = await this.repository.update(id, senha_hash ? { ...dataFilter, senha_hash } : dataFilter);

    return user;
  }

  async deleteUser(id: number): Promise<null | { message: string }> {
    if (!id) return { message: 'Campos obrigatórios ausentes' };
    const user = await this.repository.findById(id);
    const messageError = { message: "Usuário não encontrado" };
    if (!user) {
      return messageError;
    }
    const userRecord = await authAdmin.getUserByEmail(user.email)
    if (!userRecord) {
      return messageError;
    }
    await authAdmin.deleteUser(userRecord?.uid);
    await this.repository.delete(user.id);
    return null;
  }
}
