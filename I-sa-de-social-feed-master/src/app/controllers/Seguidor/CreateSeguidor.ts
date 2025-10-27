
import { Request, Response } from 'express';
import { SeguidorService } from '../../services/Seguidor';

async function createSeguidor(req: Request, res: Response) {
  try {
    const body = req.body;
    const seguidorService = new SeguidorService();
    const seguidor = await seguidorService.createSeguidor(body);

    return res.status(201).json({ seguidor, message: 'Começou a seguir com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createSeguidor;
