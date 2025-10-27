
import { Request, Response } from 'express';
import { NotificacaoService } from '../../services/Notificacao';

async function getNotificacao(req: Request, res: Response) {
  try {
    const queries: any = req.query;
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const { id } = req.params;
    const notificacaoService = new NotificacaoService();
    let results: any = null;

    const limit = parseInt(req.query.limit as string);

    const filterObject: any = {};

    delete queries.limit;

    if (queries) filterObject.queries = { ...queries, }
    if (id) filterObject.id = parseInt(id)

    if (queries.lastNotificationId) {
      filterObject.lastNotificationId = await parseInt(queries.lastNotificationId)
      delete queries.lastNotificationId
      delete filterObject.queries.lastNotificationId;
    };
    if (order) {
      filterObject.order = typeof order === "string" ? JSON.parse(order) : order;
    };
    if (req.query.limit) {
      filterObject.limit = limit
      delete queries.limit
    };
    if (Object.keys(filterObject).length > 0) {
      results = await notificacaoService.getNotificacoes(filterObject);
    } else {
      results = await notificacaoService.getNotificacoes({});
    }

    return res.json({ results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getNotificacao;
