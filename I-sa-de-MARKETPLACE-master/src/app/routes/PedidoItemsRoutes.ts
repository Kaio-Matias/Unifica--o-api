import { Router } from 'express';

import {
  CreatePedidoItems,
  DeletePedidoItems,
  GetPedidosItems,
  UpdatePedidosItems
} from "../controllers/PedidoItems"

const routes = Router();

routes.post('/create', CreatePedidoItems);
routes.get('/:id?', GetPedidosItems);
routes.put('/:id', UpdatePedidosItems);
routes.delete('/:id', DeletePedidoItems);

export default routes;
