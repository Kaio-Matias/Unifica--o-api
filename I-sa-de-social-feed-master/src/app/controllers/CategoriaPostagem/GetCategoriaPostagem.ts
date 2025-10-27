
import { Request, Response } from 'express';
import { CategoriaPostagemService } from '../../services/CategoriaPostagem';

async function getCategoriaPostagem(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries: any = req.query;
    const { id } = req.params;
    const categoriaService = new CategoriaPostagemService();
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
      results = await categoriaService.getCategoriasPostagem(filterObject);
    } else {
      results = await categoriaService.getCategoriasPostagem({});
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
      return res.status(404).json({ message: "Categoria de posts not found" });
    }

    return res.json({ ...pagination, results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getCategoriaPostagem;
