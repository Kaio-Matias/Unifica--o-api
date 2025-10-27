
import { Request, Response } from 'express';
import { PharmacyService } from "../../services/Pharmacy";

async function updatePharmacy(req: Request, res: Response) {
  try {
    const body = req.body
    const { id } = req.params
    const getService = new PharmacyService();

    const result: any = await getService.updatePharmacy(parseInt(id), body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(200).json({ result, message: "Farmácia atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default updatePharmacy;
