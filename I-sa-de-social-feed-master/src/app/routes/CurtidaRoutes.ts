import { Router } from 'express';
import { CreateCurtida, DeleteCurtida, GetCurtida, UpdateCurtida } from '../controllers/Curtida';

const Routes = Router();

Routes.post('/create', CreateCurtida);
Routes.get('/:id?', GetCurtida);
Routes.put('/:id', UpdateCurtida);
Routes.delete('/:id', DeleteCurtida);

export default Routes;
