import { Router } from 'express';
import { CreateProfissionalDetalhes,DeleteProfissionalDetalhes,GetProfissionalDetalhes, UpdateProfissionalDetalhes } from '../controllers/ProfissionalDetalhes';

const Routes = Router();

Routes.post('/create', CreateProfissionalDetalhes);
Routes.get('/:id?', GetProfissionalDetalhes);
Routes.put('/:id', UpdateProfissionalDetalhes);
Routes.delete('/:id', DeleteProfissionalDetalhes);

export default Routes;

