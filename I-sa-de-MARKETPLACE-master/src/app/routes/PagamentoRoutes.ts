import { Router } from 'express';

import {
CreatePagamento,
DeletePagamento,
GetPagamento,
UpdatePagamento
} from "../controllers/Pagamento"

const routes = Router();

routes.post('/create', CreatePagamento);
routes.get('/:id?', GetPagamento);
routes.put('/:id', UpdatePagamento);
routes.delete('/:id', DeletePagamento);

export default routes;
