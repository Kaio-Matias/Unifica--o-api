
import { Request, Response } from 'express';
import { ProfissionalDetalhesService } from '../../services/ProfissionalDetalhes';

async function createProfissionalDetalhes(req: Request, res: Response) {
  try {
    const body = req.body;
    const profissionalDetalhesService = new ProfissionalDetalhesService();
    const detalhes = await profissionalDetalhesService.createProfissionalDetalhes(body);

    return res.status(201).json({ detalhes, message: 'Detalhes profissionais criados com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createProfissionalDetalhes;
