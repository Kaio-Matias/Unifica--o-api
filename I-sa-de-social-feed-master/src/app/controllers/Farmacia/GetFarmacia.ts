
import { Request, Response } from 'express';
import { FarmaciaService } from '../../services/Farmacia';

async function getFarmacia(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries: any = req.query;
    const { cnpj } = req.params;
    const farmaciaService = new FarmaciaService();
    let results: any = null;

    const filterObject: any = {};

    const limit = parseInt(req.query.limit as string);

    delete queries.limit;

    if (queries) filterObject.queries = { ...queries, take: limit, order }
    if (cnpj) filterObject.cnpj = cnpj;
    if (queries.lastFarmaciaCNPJ) {
      filterObject.lastFarmaciaCNPJ = await queries.lastFarmaciaCNPJ;
      delete queries.lastFarmaciaCNPJ;
      delete filterObject.queries.lastFarmaciaCNPJ;
    }
    if (order) {
      filterObject.queries.order = order;
    }

    if (!order) {
      delete filterObject.queries.order
    }

    if (!req.query.limit) {
      delete filterObject.queries.take
    }

    if (Object.keys(filterObject).length > 0) {
      results = await farmaciaService.getFarmacias(filterObject);
    } else {
      results = await farmaciaService.getFarmacias({});
    }

    return res.json({ results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getFarmacia;
