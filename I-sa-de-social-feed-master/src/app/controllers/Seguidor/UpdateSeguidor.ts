
import { Request, Response } from 'express';
import { SeguidorService } from '../../services/Seguidor';

async function updateSeguidor(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const seguidorService = new SeguidorService();

    const result = await seguidorService.updateSeguidor(parseInt(id), body);

    return res.status(200).json({ result, message: 'Status de seguidor atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateSeguidor;
