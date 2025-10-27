
import { Request, Response } from 'express';
import { PostagemService } from '../../services/Postagem';

async function getPostagem(req: Request, res: Response) {
  try {
    const queries: any = req.query;
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const { id } = req.params;
    const postagemService = new PostagemService();
    let results: any = null;

    const limit = parseInt(req.query.limit as string);

    delete queries.limit;

    const filterObject: any = {};
    if (id) filterObject.id = parseInt(id);
    if (Object.keys(queries).length > 0) filterObject.queries = queries;
    if (queries.lastPostId) {
      filterObject.lastPostId = await parseInt(queries.lastPostId)
      delete queries.lastPostId
      delete filterObject.queries.lastPostId;
    };
    if (order) {
      filterObject.order = typeof order === "string" ? JSON.parse(order) : order;
    };
    if (req.query.limit) {
      filterObject.limit = limit
      delete queries.limit
    };

    if (Object.keys(filterObject).length > 0) {
      results = await postagemService.getPostagens(filterObject);
    } else {
      results = await postagemService.getPostagens({});
    }

    return res.json({ results });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default getPostagem;
