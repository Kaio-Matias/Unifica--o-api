
import { Request, Response } from 'express';
import { ComentarioService } from '../../services/Comentario';

async function updateComentario(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const comentarioService = new ComentarioService();

    const result = await comentarioService.updateComentario(parseInt(id), body);

    return res.status(200).json({ result, message: 'Comentário atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateComentario;
