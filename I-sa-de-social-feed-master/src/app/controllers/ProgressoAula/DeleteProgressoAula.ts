
import { Request, Response } from 'express';
import { ProgressoAulaService } from '../../services/ProgressoAula';

async function deleteProgressoAula(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const progressoAulaService = new ProgressoAulaService();

     await progressoAulaService.deleteProgressoAula(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteProgressoAula;
