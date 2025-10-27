
import { Request, Response } from 'express';
import { ComentarioService } from '../../services/Comentario';

async function createComentario(req: Request, res: Response) {
  try {
    const body = req.body;
    const comentarioService = new ComentarioService();
    const comentario = await comentarioService.createComentario(body);

    return res.status(201).json({ comentario, message: 'Comentário criado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createComentario;
