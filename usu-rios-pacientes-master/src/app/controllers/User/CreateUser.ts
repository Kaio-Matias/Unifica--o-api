
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function createUser(req: Request, res: Response) {
  try {
    const body = req.body
    const userService = new UserService();

    const user = await userService.createUser(body)

    if (user?.message == 'Usuário já Cadastrado') {
      return res.status(409).json({ message: user?.message });
    }

    if (user?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: user?.message });
    }

    if (user?.message) {
      return res.status(500).json({ message: user?.message });
    }

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createUser;
