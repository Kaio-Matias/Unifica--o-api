
import { Request, Response } from 'express';
import { FarmaciaService } from '../../services/Farmacia';

async function updateFarmacia(req: Request, res: Response) {
  try {
    const body = req.body;
    const { cnpj } = req.params;
    const farmaciaService = new FarmaciaService();

    const result = await farmaciaService.updateFarmacia(cnpj, body);

    return res.status(200).json({ result, message: 'Farmácia atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateFarmacia;
