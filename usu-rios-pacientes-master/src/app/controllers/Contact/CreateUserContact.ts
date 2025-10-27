
import { Request, Response } from 'express';
import { UserContactService } from "../../services/UserContact";

async function createUser(req: Request, res: Response) {
  try {
    const body = req.body
    const userContactService = new UserContactService();

    const contact = await userContactService.createUserContact(body)

    if (contact?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: contact?.message });
    }

    if (contact?.message) {
      return res.status(500).json({ message: contact?.message });
    }

    return res.status(201).json({ contact, message: "Usuário criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createUser;
