
import { Request, Response } from 'express';
import { UnidadeSaudeService } from '../../services/UnidadeSaude';

async function getUnidadeSaude(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries: any = req.query;
    const { cnpj } = req.params;
    const unidadeSaudeService = new UnidadeSaudeService();
    let results: any = null;

    const limit = parseInt(req.query.limit as string);

    delete queries.limit;

    const filterObject: any = {};
    if (cnpj) filterObject.cnpj = cnpj;
    if (Object.keys(queries).length > 0) filterObject.queries = queries;
    if (queries.lastUnidadeSaudeCNPJ) {
      filterObject.lastUnidadeSaudeCNPJ = await parseInt(queries.lastUnidadeSaudeCNPJ);
      delete queries.lastUnidadeSaudeCNPJ;
      delete filterObject.queries.lastUnidadeSaudeCNPJ;
    }
    if (req.query.limit) {
      filterObject.limit = limit
    };
    if (order) {
      filterObject.queries.order = typeof order === "string" ? JSON.parse(order) : order;
    }

    if (Object.keys(filterObject).length > 0) {
      results = await unidadeSaudeService.getUnidadesSaude(filterObject);
    } else {
      results = await unidadeSaudeService.getUnidadesSaude({});
    }

    return res.json({ results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getUnidadeSaude;
