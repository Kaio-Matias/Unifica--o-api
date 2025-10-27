
import { Request, Response } from 'express';
import { TrilhaService } from '../../services/Trilha';

async function createTrilha(req: Request, res: Response) {
  try {
    const body = req.body;
    const trilhaService = new TrilhaService();
    const trilha = await trilhaService.createTrilha(body);

    return res.status(201).json({ trilha, message: 'Trilha criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createTrilha;
