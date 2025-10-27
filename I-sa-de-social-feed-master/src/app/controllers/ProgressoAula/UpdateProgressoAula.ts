
import { Request, Response } from 'express';
import { ProgressoAulaService } from '../../services/ProgressoAula';

async function updateProgressoAula(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id_progresso } = req.params;
    const progressoAulaService = new ProgressoAulaService();

    const result = await progressoAulaService.updateProgressoAula(parseInt(id_progresso), body);

    return res.status(200).json({ result, message: 'Progresso de aula atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateProgressoAula;
