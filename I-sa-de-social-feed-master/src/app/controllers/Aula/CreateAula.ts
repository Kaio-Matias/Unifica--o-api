
import { Request, Response } from 'express';
import { AulaService } from '../../services/Aula';

async function createAula(req: Request, res: Response) {
  try {
    const body = req.body;
    const aulaService = new AulaService();
    const aula = await aulaService.createAula(body);

    return res.status(201).json({ aula, message: 'Aula criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

export default createAula;
