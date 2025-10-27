import { Router } from 'express';
import { CreateTrilha,DeleteTrilha,GetTrilha,UpdateTrilha } from '../controllers/Trilha';

const Routes = Router();

Routes.post('/create', CreateTrilha);
Routes.get('/:id?', GetTrilha);
Routes.put('/:id', UpdateTrilha);
Routes.delete('/:id', DeleteTrilha);

export default Routes;

