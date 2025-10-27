
import { Request, Response } from 'express';
import { ModuloTrilhaService } from '../../services/ModuloTrilha';

async function updateModuloTrilha(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id_modulo } = req.params;
    const moduloTrilhaService = new ModuloTrilhaService();

    const result = await moduloTrilhaService.updateModuloTrilha(parseInt(id_modulo), body);

    return res.status(200).json({ result, message: 'Módulo de trilha atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateModuloTrilha;
