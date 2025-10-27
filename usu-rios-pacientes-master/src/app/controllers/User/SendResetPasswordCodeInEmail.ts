
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function sendResetPasswordCodeInEmail(req: Request, res: Response) {
  try {
    const { email } = req.body
    const userService = new UserService();

    const user: any = await userService.sendResetPasswordCodeInEmail({ email })

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

export default sendResetPasswordCodeInEmail;
