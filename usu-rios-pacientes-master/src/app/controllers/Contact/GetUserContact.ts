
import { Request, Response } from 'express';
import { UserContactService } from "../../services/UserContact";

async function getUserContact(req: Request, res: Response) {
  try {
    const orderHeader = req.headers['order'];
    const order = typeof req.headers['order'] === "string" ? JSON.parse(orderHeader as string) : orderHeader;
    const queries = req.query
    const { id } = req.params
    const userContactService = new UserContactService();
    let contacts: any = null

    const objectFilterUser: any = {};

    const page = parseInt(queries.page as string) || 1;
    const limit = parseInt(queries.limit as string) || 10;

    const skip = (page - 1) * limit;

    if (queries) objectFilterUser.queries = { ...queries, skip, take: limit, }
    if (id) objectFilterUser.id = parseInt(id)
    if (order) {
      objectFilterUser.queries.order = typeof order ==="string" ? JSON.parse(order) : order;
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
      contacts = await userContactService.getContactUsers(objectFilterUser)
    }
    else {
      contacts = await userContactService.getContactUsers({})
    }

    const total = contacts?.length;
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

    if (contacts?.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.json({ ...pagination, contacts, });
  } catch (err) {

    return res.status(500).json({ message: err.message });
  }
}

export default getUserContact;
