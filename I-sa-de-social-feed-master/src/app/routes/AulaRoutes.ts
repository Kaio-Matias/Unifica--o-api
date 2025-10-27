import { Router } from 'express';
import { CreateAula, DeleteAula, GetAula, UpdateAula } from '../controllers/Aula';

const Routes = Router();

Routes.post('/create', CreateAula);
Routes.get('/:id?', GetAula);
Routes.put('/:id', UpdateAula);
Routes.delete('/:id', DeleteAula);

export default Routes;
