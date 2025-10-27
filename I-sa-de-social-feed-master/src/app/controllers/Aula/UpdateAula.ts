

// src/controllers/aulas/updateAulaController.ts
import { Request, Response } from 'express';
import { AulaService } from '../../services/Aula';

async function updateAula(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const aulaService = new AulaService();

    const result = await aulaService.updateAula(parseInt(id), body);

    return res.status(200).json({ result, message: 'Aula atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateAula;
