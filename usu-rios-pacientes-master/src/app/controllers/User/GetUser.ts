
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function getUser(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];

    let order: any = undefined;
    try {
      if (typeof orderHeader === 'string') {
        order = JSON.parse(orderHeader);
      } else if (typeof orderHeader === 'object' && orderHeader !== null) {
        order = orderHeader;
      }
    } catch (error) {
      console.error('Erro ao fazer parse do orderHeader:', error);
      return res.status(400).json({ message: 'Header "order" malformado. Envie um JSON válido como string.' });
    }
    const queries = req.query
    const { id } = req.params
    const userService = new UserService();
    let users: any = null

    const objectFilterUser: any = {};

    const page = await parseInt(queries.page as string) || 1;
    const limit = await parseInt(queries.limit as string) || 10;

    const skip = (page - 1) * limit;

    if (queries) objectFilterUser.queries = { ...queries, skip, take: limit, }
    if (id) objectFilterUser.id = parseInt(id)
    if (order) {
      objectFilterUser.queries.order = typeof order === "string" ? JSON.parse(order) : order;
    };

    if (!queries.page) {
      delete objectFilterUser.queries.skip
    }
    else {
      delete objectFilterUser.queries.page
    }

    if (!queries.limit) {
      delete objectFilterUser.queries.take
    }
    else {
      delete objectFilterUser.queries.limit
    }

    if (Object.keys(objectFilterUser).length > 0) {
      users = await userService.getUsers(objectFilterUser)
    }
    else {
      users = await userService.getUsers({})
    }

    const total = users?.length;
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

    if (users?.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.json({ ...pagination, users, });
  } catch (err) {

    return res.status(500).json({ message: err.message });
  }
}

export default getUser;
