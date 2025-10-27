
import { Request, Response } from 'express';
import { PostagemService } from '../../services/Postagem';

async function createPostagem(req: Request, res: Response) {
  try {
    const body = req.body;
    const postagemService = new PostagemService();
    const postagem = await postagemService.createPostagem(body);

    if (postagem?.message === 'Campos obrigatórios ausentes' || postagem?.message === 'Autor ou localização não encontrados') {
      return res.status(400).json({ message: postagem?.message });
    }
    if (postagem?.message) {
      return res.status(500).json({ message: postagem?.message });
    }
    return res.status(201).json({ postagem, message: 'Postagem criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createPostagem;
