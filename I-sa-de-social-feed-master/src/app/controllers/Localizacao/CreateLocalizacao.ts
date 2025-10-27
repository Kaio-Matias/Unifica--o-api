
import { Request, Response } from 'express';
import { LocalizacaoService } from '../../services/Localizacao';

async function createLocalizacao(req: Request, res: Response) {
  try {
    const body = req.body;
    const localizacaoService = new LocalizacaoService();
    const localizacao = await localizacaoService.createLocalizacao(body);

    return res.status(201).json({ localizacao, message: 'Localização registrada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createLocalizacao;
