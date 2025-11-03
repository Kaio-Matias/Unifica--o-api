import { Request, Response } from 'express';
import { UserService } from "../../services/User"; // Importa o serviço que tem a lógica correta

// Removemos todas as importações quebradas (getRepository, clientRedis, etc.)

// Renomeamos a classe/função para seguir o padrão de exportação
async function sendResetPasswordCodeInEmail(req: Request, res: Response): Promise<Response> {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'E-mail é obrigatório.' });
    }

    const userService = new UserService();
    
    // Chama a função correta que está no Service
    const result: any = await userService.sendResetPasswordCodeInEmail({ email });

    // Verifica se o serviço retornou alguma mensagem de erro (ex: usuário não encontrado)
    if (result?.message) {
      return res.status(404).json({ message: result.message });
    }

    // Sucesso
    return res.status(200).json({ message: 'Código de verificação enviado para o e-mail.' });

  } catch (error) {
    console.error('--- ERRO NO CONTROLLER SendResetPasswordCodeInEmail ---');
    console.error(error);
    console.error('----------------------------------------------------');
    return res.status(500).json({
      message: 'Erro interno do servidor.',
      error: error.message
    });
  }
}

export default sendResetPasswordCodeInEmail;
