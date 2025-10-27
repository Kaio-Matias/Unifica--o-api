
import { Request, Response } from 'express';
import { LocalizacaoService } from '../../services/Localizacao';

async function updateLocalizacao(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id_localizacao } = req.params;
    const localizacaoService = new LocalizacaoService();

    const result = await localizacaoService.updateLocalizacao(parseInt(id_localizacao), body);

    return res.status(200).json({ result, message: 'Localização atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateLocalizacao;
