
import { Request, Response } from 'express';
import { PostagemService } from '../../services/Postagem';

async function updatePostagem(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const postagemService = new PostagemService();

    const result = await postagemService.updatePostagem(parseInt(id), body);

    return res.status(200).json({ result, message: 'Postagem atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updatePostagem;
