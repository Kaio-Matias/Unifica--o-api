import { Router } from 'express';
import { CreateModuloTrilha, DeleteModuloTrilha, GetModuloTrilha, UpdateModuloTrilha } from '../controllers/ModuloTrilha';

const Routes = Router();

Routes.post('/create', CreateModuloTrilha);
Routes.get('/:id?', GetModuloTrilha);
Routes.put('/:id', UpdateModuloTrilha);
Routes.delete('/:id', DeleteModuloTrilha);

export default Routes;

