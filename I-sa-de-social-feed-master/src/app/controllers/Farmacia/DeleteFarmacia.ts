
import { Request, Response } from 'express';
import { FarmaciaService } from '../../services/Farmacia';

async function deleteFarmacia(req: Request, res: Response) {
  try {
    const { cnpj } = req.params;
    const farmaciaService = new FarmaciaService();

   await farmaciaService.deleteFarmacia(cnpj);
    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteFarmacia;
