import { Request, Response } from 'express';
import { PedidoService } from '../../services/Pedido';

async function createPedido(req: Request, res: Response) {
  try {
    const body = req.body;
    const pedidoService = new PedidoService();

    // O serviço deve lançar erros explicativos se falhar
    const result = await pedidoService.createPedido(body);

    return res.status(201).json({ 
      message: "Pedido realizado com sucesso", 
      pedido: result 
    });

  } catch (err: any) {
    console.error("Erro ao criar pedido:", err);

    // Lista de erros de negócio conhecidos (retornar 400 Bad Request)
    const businessErrors = [
      'Campos obrigatórios ausentes',
      'Produto sem estoque',
      'Carrinho vazio',
      'Erro no processamento do pagamento'
    ];

    if (businessErrors.some(msg => err.message?.includes(msg))) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ 
      message: "Erro interno ao processar o pedido.",
      detail: err.message 
    });
  }
}

export default createPedido;