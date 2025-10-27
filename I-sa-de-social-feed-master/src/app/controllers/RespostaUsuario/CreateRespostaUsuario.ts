
import { Request, Response } from 'express';
import { RespostaUsuarioService } from '../../services/RespostaUsuario';

async function createRespostaUsuario(req: Request, res: Response) {
  try {
    const body = req.body;
    const respostaUsuarioService = new RespostaUsuarioService();
    const resposta = await respostaUsuarioService.createRespostaUsuario(body);

    return res.status(201).json({ resposta, message: 'Resposta de usuário registrada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createRespostaUsuario;
