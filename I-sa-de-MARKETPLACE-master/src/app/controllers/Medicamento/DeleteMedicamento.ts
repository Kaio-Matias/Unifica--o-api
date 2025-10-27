
import { Request, Response } from 'express';
import { MedicamentoService } from "../../services/Medicamento";

async function deleteMedicamento(req: Request, res: Response) {
  try {
    const { id } = req.params
    const getService = new MedicamentoService();

    const result: any = await getService.deleteMedicamento(parseInt(id))

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

export default deleteMedicamento;
