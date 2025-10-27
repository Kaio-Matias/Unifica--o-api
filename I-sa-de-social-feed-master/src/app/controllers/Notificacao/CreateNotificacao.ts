
import { Request, Response } from 'express';
import { NotificacaoService } from '../../services/Notificacao';

async function createNotificacao(req: Request, res: Response) {
  try {
    const body = req.body;
    const notificacaoService = new NotificacaoService();
    const notificacao = await notificacaoService.createNotificacao(body);

    return res.status(201).json({ notificacao, message: 'Notificação criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createNotificacao;
