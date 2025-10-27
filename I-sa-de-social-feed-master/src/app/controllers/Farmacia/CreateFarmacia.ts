
import { Request, Response } from 'express';
import { FarmaciaService } from '../../services/Farmacia';

async function createFarmacia(req: Request, res: Response) {
  try {
    const body = req.body;
    const farmaciaService = new FarmaciaService();
    const farmacia = await farmaciaService.createFarmacia(body);

    return res.status(201).json({ farmacia, message: 'Farmácia criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createFarmacia;
