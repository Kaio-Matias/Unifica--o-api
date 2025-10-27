import { Router } from 'express';

import {
  CreateMedicamento,
  DeleteMedicamento,
  GetMedicamento,
  UpdateMedicamento
} from "../controllers/Medicamento"

const routes = Router();

routes.post('/create', CreateMedicamento);
routes.get('/:id?', GetMedicamento);
routes.put('/:id', UpdateMedicamento);
routes.delete('/:id', DeleteMedicamento);

export default routes;
