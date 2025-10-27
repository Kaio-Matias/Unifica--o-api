
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function verifyLoginUser(req: Request, res: Response) {
  try {
    const { token } = req.body
    const userService = new UserService();

    const response: any = await userService.verifyLogin({ token });

    if (typeof response === "string") {
      return res.status(400).json({ message: response });
    }

    return res.json({ message: 'Token válidado com sucesso' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export default verifyLoginUser;
