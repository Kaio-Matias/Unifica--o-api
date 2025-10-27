
import { Request, Response } from 'express';
import { SalvamentoService } from '../../services/Salvamento';

async function createSalvamento(req: Request, res: Response) {
  try {
    const body = req.body;
    const salvamentoService = new SalvamentoService();
    const salvamento = await salvamentoService.createSalvamento(body);

    return res.status(201).json({ salvamento, message: 'Conteúdo salvo com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createSalvamento;
