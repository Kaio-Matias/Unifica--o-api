
import { Request, Response } from 'express';
import { PharmacyService} from "../../services/Pharmacy";

async function createPharmacy(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new PharmacyService();

    const results = await getService.createPharmacy(body)

    return res.status(201).json({ results, message: "Farmácia criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createPharmacy;
