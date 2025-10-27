
import { Request, Response } from 'express';
import { UnidadeSaudeService } from '../../services/UnidadeSaude';

async function updateUnidadeSaude(req: Request, res: Response) {
  try {
    const body = req.body;
    const { cnpj } = req.params;
    const unidadeSaudeService = new UnidadeSaudeService();

    const result = await unidadeSaudeService.updateUnidadeSaude(cnpj, body);

    return res.status(200).json({ result, message: 'Unidade de saúde atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateUnidadeSaude;
