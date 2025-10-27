
import { Request, Response } from 'express';
import { UserService } from "../../services/User"

async function resetPassword(req: Request, res: Response) {
  try {
    const { password, repeatPassword, email, otpCode } = req.body
    const userService = new UserService();

    const user: any = await userService.resetPassword({ password, repeatPassword, email, otpCode })

    if (user?.message === "Senhas não coincidem") {
      return res.status(401).json({ message: user?.message });
    }

    if (user?.message === "Usuário não encontrado") {
      return res.status(404).json({ message: user?.message });
    }

    return res.status(200).json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default resetPassword;
