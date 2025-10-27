
import { Request, Response } from 'express';
import { ProfissionalDetalhesService } from '../../services/ProfissionalDetalhes';

async function updateProfissionalDetalhes(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const profissionalDetalhesService = new ProfissionalDetalhesService();

    const result = await profissionalDetalhesService.updateProfissionalDetalhes(parseInt(id), body);

    return res.status(200).json({ result, message: 'Detalhes profissionais atualizados com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateProfissionalDetalhes;
