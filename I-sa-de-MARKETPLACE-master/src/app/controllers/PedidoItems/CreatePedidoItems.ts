
import { Request, Response } from 'express';
import { PedidoService } from "../../services/Pedido";
import { PedidoItemService } from "../../services/PedidoItems";

async function createPedidoItems(req: Request, res: Response) {
  try {
    const body = req.body
    const getServicePedidoItem = new PedidoItemService();

    const results = await getServicePedidoItem.createPedidoItem(body);

    return res.status(201).json({ results, message: "Item criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createPedidoItems;
