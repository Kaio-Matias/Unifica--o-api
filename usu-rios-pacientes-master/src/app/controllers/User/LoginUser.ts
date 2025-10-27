
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const userService = new UserService();

    const user: any = await userService.login({ email, password });

    if (user?.message) {
      return res.status(400).json({ message: user?.message });
    }

    return res.json({ message: 'Login efetuado com sucesso', token: user.token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export default loginUser;
