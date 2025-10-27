
import { Request, Response } from 'express';
import { LocalizacaoService } from '../../services/Localizacao';

async function deleteLocalizacao(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const localizacaoService = new LocalizacaoService();

    await localizacaoService.deleteLocalizacao(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteLocalizacao;
