
import { Request, Response } from 'express';
import { CarrinhoService } from "../../services/Carrinho";

async function getUserCarrinho(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries: any = req.query
    const { id } = req.params
    const carinhoService = new CarrinhoService();
    let results: any = null

    const objectFilter: any = {};

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    if (queries.user_id) {
      objectFilter.user_id = parseInt(queries.user_id || '0')
      delete queries.user_id
    }

    if (queries) objectFilter.queries = { ...queries, skip, take: limit, }
    if (id) objectFilter.id = parseInt(id)
    if (order) {
      objectFilter.queries.order = typeof order === "string" ? JSON.parse(order) : order;
    };

    if (!req.query.page) {
      delete objectFilter.queries.skip
    } else {
      delete objectFilter.queries.page
    }

    if (!req.query.limit) {
      delete objectFilter.queries.take
    } else {
      delete objectFilter.queries.limit
    }

    if (Object.keys(queries).length === 0) {
      delete objectFilter.queries
    }

    if (Object.keys(objectFilter).length > 0) {
      results = await carinhoService.getCarrinhoItems(objectFilter)
    }
    else {
      results = await carinhoService.getCarrinhoItems({})
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
      return res.status(404).json({ message: "Carrinho not found" });
    }

    return res.json({ ...pagination, results });
  } catch (err) {

    return res.status(500).json({ message: err.message });
  }
}

export default getUserCarrinho;
