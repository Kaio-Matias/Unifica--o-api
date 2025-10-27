
import { Request, Response } from 'express';
import { UserContactService } from "../../services/UserContact";

async function updateUserContact(req: Request, res: Response) {
  try {
    const body = req.body
    const { id } = req.params
    const userContactService = new UserContactService();

    const contact: any = await userContactService.updateUser(parseInt(id), body)

    if (contact?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: contact?.message });
    }

    if (contact?.message) {
      return res.status(500).json({ message: contact?.message });
    }

    return res.status(200).json({ contact, message: "Contato atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default updateUserContact;
