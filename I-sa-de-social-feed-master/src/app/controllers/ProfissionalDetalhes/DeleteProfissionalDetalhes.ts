

import { Request, Response } from 'express';
import { ProfissionalDetalhesService } from '../../services/ProfissionalDetalhes';

async function deleteProfissionalDetalhes(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const profissionalDetalhesService = new ProfissionalDetalhesService();

     await profissionalDetalhesService.deleteProfissionalDetalhes(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteProfissionalDetalhes;
