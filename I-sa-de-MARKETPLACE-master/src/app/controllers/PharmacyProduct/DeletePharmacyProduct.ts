
import { Request, Response } from 'express';
import { PharmacyProductService } from "../../services/PharmacyProduct";

async function deletePharmacyProduct(req: Request, res: Response) {
  try {
    const { idPharmarcy, idPharmarcyProduct } = req.params
    const getService = new PharmacyProductService();

    const result: any = await getService.deletePharmacyProduct(parseInt(idPharmarcyProduct), parseInt(idPharmarcy))

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

export default deletePharmacyProduct;
