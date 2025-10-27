
import { Request, Response } from 'express';
import { SalvamentoService } from '../../services/Salvamento';

async function updateSalvamento(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const salvamentoService = new SalvamentoService();

    const result = await salvamentoService.updateSalvamento(parseInt(id), body);

    return res.status(200).json({ result, message: 'Resposta de usuário atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateSalvamento;
