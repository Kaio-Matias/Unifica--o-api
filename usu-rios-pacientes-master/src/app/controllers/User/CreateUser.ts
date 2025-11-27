import { Request, Response } from 'express';
import { UserService } from '../../services/User';

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      // 1. Instancia o Serviço
      const userService = new UserService();

      // 2. Prepara os dados vindos do Body
      // O Service espera a interface IUser. Adicionamos os campos faltantes com valores padrão.
      const userData = {
        nome: req.body.name,           // Mapeando 'name' do request para 'nome'
        email: req.body.email,
        senha_hash: req.body.password, // Será hashada dentro do service
        tipo_usuario: req.body.role,   // Mapeando 'role' para 'tipo_usuario'
        cpfcnpj: req.body.cpf,         // Mapeando 'cpf' para 'cpfcnpj'
        telefone: req.body.phone,      // Opcional
        
        // --- CORREÇÃO DO ERRO DE TIPAGEM ---
        // Definindo valores padrão para satisfazer a interface IUser
        is_active: true,       // Usuário nasce ativo (ou false se depender de ativação por email estrita)
        perfil_privado: false, // Padrão público
        is_verificado: false   // Padrão não verificado
      };

      // 3. Chama o Serviço (que lida com Firebase e DB)
      const result = await userService.createUser(userData);

      // 4. Tratamento de erros retornados pelo serviço
      if (result && result.message) {
        // Se o serviço retornou um objeto com 'message', é um erro de negócio
        return res.status(400).json({ error: result.message });
      }

      // 5. Sucesso
      return res.status(201).json({
        message: "Usuário criado com sucesso.",
        user: {
            id: result.id,
            nome: result.nome,
            email: result.email,
            tipo_usuario: result.tipo_usuario
        }
      });

    } catch (error: any) {
      console.error("Erro no CreateUserController:", error);
      return res.status(500).json({ 
        error: "Erro interno ao criar usuário.",
        details: error.message 
      });
    }
  }
}

export { CreateUserController };