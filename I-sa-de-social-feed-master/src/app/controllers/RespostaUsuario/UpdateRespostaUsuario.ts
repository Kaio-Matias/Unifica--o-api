
import { Request, Response } from 'express';
import { RespostaUsuarioService } from '../../services/RespostaUsuario';

async function updateRespostaUsuario(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const respostaUsuarioService = new RespostaUsuarioService();

    const result = await respostaUsuarioService.updateRespostaUsuario(parseInt(id), body);

    return res.status(200).json({ result, message: 'Resposta de usuário atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateRespostaUsuario;
