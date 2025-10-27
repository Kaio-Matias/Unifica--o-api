
import { Request, Response } from 'express';
import { PagamentoService } from "../../services/Pagamento";
import { MercadoPagoService } from 'src/app/services/APIPayments';

async function createPayment(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new PagamentoService();
    const newPaymentService = new MercadoPagoService();

    const results = await newPaymentService.createPayment({ ...req.body, amount: req.body.valor });

    await getService.createPayment({ ...body, id_mp_payment: results.id });

    return res.status(201).json({ results, message: "Pagamento criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createPayment;
