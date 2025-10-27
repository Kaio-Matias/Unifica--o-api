
import { Request, Response } from 'express';
import { ModuloTrilhaService } from '../../services/ModuloTrilha';

async function createModuloTrilha(req: Request, res: Response) {
  try {
    const body = req.body;
    const moduloTrilhaService = new ModuloTrilhaService();
    const modulo = await moduloTrilhaService.createModuloTrilha(body);

    return res.status(201).json({ modulo, message: 'Módulo de trilha criado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createModuloTrilha;
