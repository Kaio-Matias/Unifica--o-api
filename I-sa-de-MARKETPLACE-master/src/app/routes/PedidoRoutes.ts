import { Router } from 'express';

import {
  CreatePedido,
  DeletePedido,
  GetPedidos,
  UpdatePedidos
} from "../controllers/Pedido"

const routes = Router();

routes.post('/create', CreatePedido);
routes.get('/:id?', GetPedidos);
routes.put('/:id', UpdatePedidos);
routes.delete('/:id', DeletePedido);

export default routes;
