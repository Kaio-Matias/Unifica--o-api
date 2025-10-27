import { Router } from 'express';

import {
  CreatePharmacyProduct,
  DeletePharmacyProduct,
  GetPharmacyProducts,
  UpdatePharmacyProducts
} from "../controllers/PharmacyProduct"

const routes = Router();

routes.post('/create', CreatePharmacyProduct);
routes.get('/:id?', GetPharmacyProducts);
routes.put('/:id', UpdatePharmacyProducts);
routes.delete('/:id',DeletePharmacyProduct);

export default routes;
