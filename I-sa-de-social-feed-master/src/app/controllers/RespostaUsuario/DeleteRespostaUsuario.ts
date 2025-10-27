
import { Request, Response } from 'express';
import { RespostaUsuarioService } from '../../services/RespostaUsuario';

async function deleteRespostaUsuario(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const respostaUsuarioService = new RespostaUsuarioService();

   await respostaUsuarioService.deleteRespostaUsuario(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteRespostaUsuario;
