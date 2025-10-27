import { Router } from 'express';
import { CreateEndereco, DeleteEndereco, GetEndereco, UpdateEndereco } from '../controllers/Endereco';

const Routes = Router();

Routes.post('/create', CreateEndereco);
Routes.get('/:id?', GetEndereco);
Routes.put('/:id', UpdateEndereco);
Routes.delete('/:id', DeleteEndereco);

export default Routes;
