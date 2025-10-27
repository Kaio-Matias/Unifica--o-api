
import { Request, Response } from 'express';
import { CurtidaService } from '../../services/Curtida';

async function createCurtida(req: Request, res: Response) {
  try {
    const body = req.body;
    const curtidaService = new CurtidaService();
    const curtida = await curtidaService.createCurtida(body);

    return res.status(201).json({ curtida, message: 'Curtida criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createCurtida;
