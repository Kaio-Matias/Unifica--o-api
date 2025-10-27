
import { Request, Response } from 'express';
import { LocalizacaoService } from '../../services/Localizacao';

async function getLocalizacao(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries: any = req.query;
    const { id } = req.params;
    const localizacaoService = new LocalizacaoService();
    let results: any = null;

    const filterObject: any = {};
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    if (queries) filterObject.queries = { ...queries, skip, take: limit, }
    if (id) filterObject.id = parseInt(id)
    if (order) {
      filterObject.queries.order = typeof order === "string" ? JSON.parse(order) : order;
    }

    if (!req.query.page) {
      delete filterObject.queries.skip
    }

    if (!req.query.limit) {
      delete filterObject.queries.take
    }

    if (Object.keys(filterObject).length > 0) {
      results = await localizacaoService.getLocalizacoes(filterObject);
    } else {
      results = await localizacaoService.getLocalizacoes({});
    }

    const total = results?.length;
    const totalPages = Math.ceil(total / limit);
    const currentPage = page;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const nextPage = hasNextPage ? currentPage + 1 : null;
    const previousPage = hasPreviousPage ? currentPage - 1 : null;
    const pagination = {
      total,
      totalPages,
      currentPage,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage
    };

    if (results.length === 0) {
      return res.status(404).json({ message: "Localizacao not found" });
    }

    return res.json({ ...pagination, results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getLocalizacao;
