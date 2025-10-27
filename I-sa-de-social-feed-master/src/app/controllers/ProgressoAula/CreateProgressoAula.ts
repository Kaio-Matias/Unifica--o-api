
import { Request, Response } from 'express';
import { ProgressoAulaService } from '../../services/ProgressoAula';

async function createProgressoAula(req: Request, res: Response) {
  try {
    const body = req.body;
    const progressoAulaService = new ProgressoAulaService();
    const progresso = await progressoAulaService.createProgressoAula(body);

    return res.status(201).json({ progresso, message: 'Progresso de aula registrado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createProgressoAula;
