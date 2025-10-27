import { Router } from 'express';
import { CreateSeguidor,DeleteSeguidor,GetSeguidor,UpdateSeguidor } from '../controllers/Seguidor';

const Routes = Router();

Routes.post('/create', CreateSeguidor);
Routes.get('/:id?', GetSeguidor);
Routes.put('/:id', UpdateSeguidor);
Routes.delete('/:id', DeleteSeguidor);

export default Routes;

