
import { Request, Response } from 'express';
import { CategoriaPostagemService } from '../../services/CategoriaPostagem';

async function updateCategoriaPostagem(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id_categoria } = req.params;
    const categoriaService = new CategoriaPostagemService();

    const result = await categoriaService.updateCategoriaPostagem(parseInt(id_categoria), body);

    return res.status(200).json({ result, message: 'Categoria de postagem atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateCategoriaPostagem;
