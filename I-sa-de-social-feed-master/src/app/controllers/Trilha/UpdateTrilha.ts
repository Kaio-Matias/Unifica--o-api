
import { Request, Response } from 'express';
import { TrilhaService } from '../../services/Trilha';

async function updateTrilha(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const trilhaService = new TrilhaService();

    const result = await trilhaService.updateTrilha(parseInt(id), body);

    return res.status(200).json({ result, message: 'Trilha atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateTrilha;
