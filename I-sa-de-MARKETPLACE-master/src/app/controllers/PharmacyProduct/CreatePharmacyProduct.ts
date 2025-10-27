
import { Request, Response } from 'express';
import { PharmacyProductService} from "../../services/PharmacyProduct";

async function createPharmacyProduct(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new PharmacyProductService();

    const results = await getService.createPharmacyProduct(body)

    return res.status(201).json({ results, message: "Produto criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createPharmacyProduct;
