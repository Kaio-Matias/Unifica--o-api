
import { Request, Response } from 'express';
import { PedidoService } from "../../services/Pedido";

async function deletePedido(req: Request, res: Response) {
  try {
    const { id } = req.params
    const getService = new PedidoService();

    const result: any = await getService.deletePedido(parseInt(id))

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

export default deletePedido;
