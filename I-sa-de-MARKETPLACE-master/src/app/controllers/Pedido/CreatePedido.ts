
import { Request, Response } from 'express';
import { PedidoService } from "../../services/Pedido";
import { PedidoItemService } from "../../services/PedidoItems";

async function createPedido(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new PedidoService();
    const getServicePedidoItem = new PedidoItemService();

    const pedido = await getService.createPedido(body);
    let items: any[] = [];

    if (req.body.items && req.body.items.length > 0) {
      items = body.items.map(item => {
        return getServicePedidoItem.createPedidoItem({
          pedido,
          titulo: item.title,
          unit_price: item.unit_price,
          quantity: item.quantity,
          description: item.description,
          picture_url: item.picture_url,
          currency_id: item.currency_id,
          category_id: item.category_id,
          produto_id: item.produto_id // se tiver
        });
      });
    }

    return res.status(201).json({ results: pedido, items, message: "Pedido criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createPedido;
