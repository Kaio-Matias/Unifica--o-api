
import { Request, Response } from 'express';
import { CategoriaPostagemService } from '../../services/CategoriaPostagem';

async function createCategoriaPostagem(req: Request, res: Response) {
  try {
    const body = req.body;
    const categoriaService = new CategoriaPostagemService();
    const categoria = await categoriaService.createCategoriaPostagem(body);

    return res.status(201).json({ categoria, message: 'Categoria de postagem criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createCategoriaPostagem;
