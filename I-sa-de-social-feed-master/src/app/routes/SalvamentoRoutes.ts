import { Router } from 'express';
import { CreateSalvamento,DeleteSalvamento,GetSalvamento,UpdateSalvamento } from '../controllers/Salvamento';

const Routes = Router();

Routes.post('/create', CreateSalvamento);
Routes.get('/:id?', GetSalvamento);
Routes.put('/:id', UpdateSalvamento);
Routes.delete('/:id', DeleteSalvamento);

export default Routes;

