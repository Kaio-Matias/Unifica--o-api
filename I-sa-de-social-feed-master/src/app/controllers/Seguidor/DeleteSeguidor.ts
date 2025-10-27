
import { Request, Response } from 'express';
import { SeguidorService } from '../../services/Seguidor';

async function deleteSeguidor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const seguidorService = new SeguidorService();

    await seguidorService.deleteSeguidor(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteSeguidor;
