
import { Request, Response } from 'express';
import { PagamentoService } from "../../services/Pagamento";
import { MercadoPagoService } from 'src/app/services/APIPayments';

async function deletePayment(req: Request, res: Response) {
  try {
    const { id } = req.params
    const getService = new PagamentoService();
    const newPaymentService = new MercadoPagoService();

    const { idPayment } = req.query;
    if (idPayment) {
      await newPaymentService.cancelPayment(String(idPayment));
    }

    const result: any = await getService.delete(parseInt(id))

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

export default deletePayment;
