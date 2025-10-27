
import { Request, Response } from 'express';
import { MedicamentoService } from "../../services/Medicamento";

async function createMedicamento(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new MedicamentoService();

    const results = await getService.createMedicamento(body)

    return res.status(201).json({ results, message: "Medicamento criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createMedicamento;
