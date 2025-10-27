
import { Request, Response } from 'express';
import { ComentarioService } from '../../services/Comentario';

async function deleteComentario(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const comentarioService = new ComentarioService();

    await comentarioService.deleteComentario(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteComentario;
