
import { Request, Response } from 'express';
import { NotificacaoService } from '../../services/Notificacao';

async function updateNotificacao(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id_notificacao } = req.params;
    const notificacaoService = new NotificacaoService();

    const result = await notificacaoService.updateNotificacao(parseInt(id_notificacao), body);

    return res.status(200).json({ result, message: 'Notificação atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateNotificacao;
