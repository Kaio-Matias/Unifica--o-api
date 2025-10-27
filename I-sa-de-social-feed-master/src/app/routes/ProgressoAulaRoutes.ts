import { Router } from 'express';
import { CreateProgressoAula, DeleteProgressoAula, GetProgressoAula, UpdateProgressoAula } from '../controllers/ProgressoAula';

const Routes = Router();

Routes.post('/create', CreateProgressoAula);
Routes.get('/:id?', GetProgressoAula);
Routes.put('/:id', UpdateProgressoAula);
Routes.delete('/:id', DeleteProgressoAula);

export default Routes;

