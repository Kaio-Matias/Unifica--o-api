
import { Request, Response } from 'express';
import { CarrinhoService } from "../../services/Carrinho";

async function updateUserCarrinho(req: Request, res: Response) {
  try {
    const body = req.body
    const { id } = req.params
    const carinhoService = new CarrinhoService();

    const result: any = await carinhoService.updateCarrinho(parseInt(id), body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(200).json({ result, message: "Carrinho atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default updateUserCarrinho;
