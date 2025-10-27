
import { Request, Response } from 'express';
import { CarrinhoService } from "../../services/Carrinho";

async function deleteUserCarrinhoItems(req: Request, res: Response) {
  try {
    const { id } = req.params
    const carinhoService = new CarrinhoService();

    const result: any = await carinhoService.deleteCarrinhoItems({ idCarrinhoItem: id })

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default deleteUserCarrinhoItems;
