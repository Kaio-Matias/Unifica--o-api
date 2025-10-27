
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function verifyPasswordCodeInEmail(req: Request, res: Response) {
  try {
    const { email, otpCode } = req.body
    const userService = new UserService();

    const user: any = await userService.verifyPasswordCodeInEmail({ email, otpCode })

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

export default verifyPasswordCodeInEmail;
