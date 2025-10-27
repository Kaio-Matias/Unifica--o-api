
import { Request, Response } from 'express';
import { UserContactService } from "../../services/UserContact";

async function deleteUserContact(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userContactService = new UserContactService();

    const contact: any = await userContactService.deleteUser(parseInt(id))

    if (contact?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: contact?.message });
    }

    if (contact?.message) {
      return res.status(500).json({ message: contact?.message });
    }

    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default deleteUserContact;
