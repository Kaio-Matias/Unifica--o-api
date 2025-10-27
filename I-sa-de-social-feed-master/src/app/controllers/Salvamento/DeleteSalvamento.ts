
import { Request, Response } from 'express';
import { SalvamentoService } from '../../services/Salvamento';

async function deleteSalvamento(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const salvamentoService = new SalvamentoService();

    await salvamentoService.deleteSalvamento(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteSalvamento;
