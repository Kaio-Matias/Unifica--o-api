
import { Request, Response } from 'express';
import { UnidadeSaudeService } from '../../services/UnidadeSaude';

async function createUnidadeSaude(req: Request, res: Response) {
  try {
    const body = req.body;
    const unidadeSaudeService = new UnidadeSaudeService();
    const unidade = await unidadeSaudeService.createUnidadeSaude(body);

    return res.status(201).json({ unidade, message: 'Unidade de saúde criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createUnidadeSaude;
