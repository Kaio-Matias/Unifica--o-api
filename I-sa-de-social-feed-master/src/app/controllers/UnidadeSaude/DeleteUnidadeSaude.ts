
import { Request, Response } from 'express';
import { UnidadeSaudeService } from '../../services/UnidadeSaude';

async function deleteUnidadeSaude(req: Request, res: Response) {
  try {
    const { cnpj } = req.params;
    const unidadeSaudeService = new UnidadeSaudeService();

    await unidadeSaudeService.deleteUnidadeSaude(cnpj);

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteUnidadeSaude;
