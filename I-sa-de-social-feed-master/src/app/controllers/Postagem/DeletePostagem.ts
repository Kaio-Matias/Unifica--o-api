
import { Request, Response } from 'express';
import { PostagemService } from '../../services/Postagem';

async function deletePostagem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const postagemService = new PostagemService();

    await postagemService.deletePostagem( parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deletePostagem;
