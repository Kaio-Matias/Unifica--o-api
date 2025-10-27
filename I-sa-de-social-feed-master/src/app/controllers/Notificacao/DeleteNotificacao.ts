
import { Request, Response } from 'express';
import { ModuloTrilhaService } from '../../services/ModuloTrilha';

async function deleteModuloTrilha(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const moduloTrilhaService = new ModuloTrilhaService();

    await moduloTrilhaService.deleteModuloTrilha(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteModuloTrilha;
