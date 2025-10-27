import { Router } from 'express';

import {
  CreateUserCarrinho,
  DeleteUserCarrinho,
  GetUserCarrinho,
  UpdateUserCarrinho
} from "../controllers/Carrinho"

const routes = Router();

routes.post('/create', CreateUserCarrinho);
routes.get('/:id?', GetUserCarrinho);
routes.put('/:id', UpdateUserCarrinho);
routes.delete('/:id', DeleteUserCarrinho);

export default routes;
