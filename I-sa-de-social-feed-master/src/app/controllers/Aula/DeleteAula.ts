
import { Request, Response } from 'express';
import { AulaService } from '../../services/Aula';

async function deleteAula(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const aulaService = new AulaService();

    await aulaService.deleteAula(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteAula;
