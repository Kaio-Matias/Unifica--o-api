import { Router } from 'express';

import {
  CreatePharmacy,
  DeletePharmacy,
  GetPharmacy,
  UpdatePharmacy
} from "../controllers/Pharmacy"

const routes = Router();

routes.post('/create', CreatePharmacy);
routes.get('/:id?', GetPharmacy);
routes.put('/:id', UpdatePharmacy);
routes.delete('/:id',DeletePharmacy);

export default routes;
