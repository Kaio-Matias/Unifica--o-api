
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params
    const userService = new UserService();

    const user: any = await userService.deleteUser(parseInt(id))

    if (user?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: user?.message });
    }

    if (user?.message) {
      return res.status(500).json({ message: user?.message });
    }

    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default deleteUser;
