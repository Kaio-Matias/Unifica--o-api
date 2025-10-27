import { Router } from 'express';

import {
  CreatePromocao,
  DeletePromocao,
  GetPromocao,
  UpdatePromocao
} from "../controllers/Promocao"

const routes = Router();

routes.post('/create', CreatePromocao);
routes.get('/:id?', GetPromocao);
routes.put('/:id', UpdatePromocao);
routes.delete('/:id', DeletePromocao);

export default routes;
