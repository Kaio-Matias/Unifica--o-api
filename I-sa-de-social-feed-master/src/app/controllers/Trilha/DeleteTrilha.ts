
import { Request, Response } from 'express';
import { TrilhaService } from '../../services/Trilha';

async function deleteTrilha(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const trilhaService = new TrilhaService();

    await trilhaService.deleteTrilha(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteTrilha;
