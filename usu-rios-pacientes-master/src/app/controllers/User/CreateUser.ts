import { Request, Response } from 'express';
import { UserService } from '../../services/User';

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      // 1. Instancia o Serviço de Usuário
      const userService = new UserService();

      // 2. Validação básica de entrada (Opcional, mas recomendado)
      if (!req.body.email || !req.body.password || !req.body.role) {
        return res.status(400).json({ error: "Campos obrigatórios (email, password, role) estão faltando." });
      }

      // 3. Mapeamento de Dados (Frontend -> Backend)
      // O App envia chaves em inglês, o Banco salva em português.
      const userData = {
        nome: req.body.name,           // App: name -> DB: nome
        email: req.body.email,         // App: email -> DB: email
        senha_hash: req.body.password, // App: password -> DB: senha_hash (será criptografada no service)
        tipo_usuario: req.body.role,   // App: role -> DB: tipo_usuario
        cpfcnpj: req.body.cpf,         // App: cpf -> DB: cpfcnpj
        telefone: req.body.phone,      // App: phone -> DB: telefone
        
        // 4. Valores Padrão (Necessários para a Entidade TypeORM não quebrar)
        is_active: true,       
        perfil_privado: false, 
        is_verificado: false,
        
        // Campos opcionais que podem vir nulos
        ft_perfil: null,
        ft_capa: null,
        descricao_bio: null,
        genero: null,
        dt_nascimento: null,
        estado: null
      };

      // 5. Chama o Serviço
      // O 'any' é usado aqui porque a interface IUser pode ser estrita, 
      // mas estamos passando o objeto mapeado corretamente.
      const result = await userService.createUser(userData as any);

      // 6. Tratamento de Erros de Negócio (ex: Email já existe)
      if (result instanceof Error) {
        return res.status(400).json({ error: result.message });
      }
      
      // Verificação extra caso o serviço retorne um objeto de erro customizado
      if ((result as any).message && !(result as any).id) {
         return res.status(400).json({ error: (result as any).message });
      }

      // 7. Resposta de Sucesso
      return res.status(201).json({
        message: "Usuário criado com sucesso.",
        user: {
            id: result.id,
            nome: result.nome,
            email: result.email,
            role: result.tipo_usuario
        }
      });

    } catch (error: any) {
      console.error("Erro fatal no CreateUserController:", error);
      return res.status(500).json({ 
        error: "Erro interno do servidor ao criar usuário.",
        details: error.message 
      });
    }
  }
}

export { CreateUserController };