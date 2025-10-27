
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function updateUser(req: Request, res: Response) {
  try {
    const body = req.body
    const { id } = req.params
    const userService = new UserService();

    const user: any = await userService.updateUser(parseInt(id), body)

    if (user?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: user?.message });
    }

    if (user?.message) {
      return res.status(500).json({ message: user?.message });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default updateUser;
