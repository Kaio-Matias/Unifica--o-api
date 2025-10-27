
import { Request, Response } from 'express';
import { CategoriaPostagemService } from '../../services/CategoriaPostagem';

async function deleteCategoriaPostagem(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const categoriaService = new CategoriaPostagemService();

    await categoriaService.deleteCategoriaPostagem(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteCategoriaPostagem;
