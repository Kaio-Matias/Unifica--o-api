
import { Request, Response } from 'express';
import { SalvamentoService } from '../../services/Salvamento';

async function getSalvamento(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries: any = req.query;
    const { id } = req.params;
    const salvamentoService = new SalvamentoService();
    let results: any = null;

    const limit = parseInt(req.query.limit as string);

    delete queries.limit

    const filterObject: any = {};
    if (id) filterObject.id = parseInt(id);
    if (Object.keys(queries).length > 0) filterObject.queries = queries;
    if (queries.lastSalvamentoId) {
      filterObject.lastSalvamentoId = await parseInt(queries.lastSalvamentoId);
      delete queries.lastSalvamentoId;
      delete filterObject.queries.lastSalvamentoId;
    }
    if (req.query.limit) {
      filterObject.limit = limit
    };
    if (order) {
      filterObject.order = typeof order === "string" ? JSON.parse(order) : order;
    }

    if (Object.keys(filterObject).length > 0) {
      results = await salvamentoService.getSalvamentos(filterObject);
    } else {
      results = await salvamentoService.getSalvamentos({});
    }

    return res.json({ results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getSalvamento;
