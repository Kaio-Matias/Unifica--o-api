
import { Request, Response } from 'express';
import { CurtidaService } from '../../services/Curtida';

async function deleteCurtida(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const curtidaService = new CurtidaService();

    await curtidaService.deleteCurtida(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteCurtida;
