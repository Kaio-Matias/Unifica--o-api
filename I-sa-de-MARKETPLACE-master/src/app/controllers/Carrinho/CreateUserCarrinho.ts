
import { Request, Response } from 'express';
import { CarrinhoService } from "../../services/Carrinho";

async function createUserCarrinho(req: Request, res: Response) {
  try {
    const body = req.body
    const carinhoService = new CarrinhoService();

    const contact: any = await carinhoService.createCarrinho(body)

    if (contact?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: contact?.message });
    }

    if (contact?.message) {
      return res.status(500).json({ message: contact?.message });
    }

    return res.status(201).json({ contact, message: "Carrinho criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createUserCarrinho;
