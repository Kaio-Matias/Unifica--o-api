import { Router } from 'express';

import {
  CreateReceitaDigital,
  DeleteReceitaDigital,
  GetReceitaDigital,
  UpdateReceitaDigital
} from "../controllers/ReceitaDigital"

const routes = Router();

routes.post('/create', CreateReceitaDigital);
routes.get('/:id?', GetReceitaDigital);
routes.put('/:id', UpdateReceitaDigital);
routes.delete('/:id', DeleteReceitaDigital);

export default routes;
