import { Router } from 'express';
import { CreateRespostaUsuario, DeleteRespostaUsuario, GetRespostaUsuario, UpdateRespostaUsuario } from '../controllers/RespostaUsuario';

const Routes = Router();

Routes.post('/create', CreateRespostaUsuario);
Routes.get('/:id?', GetRespostaUsuario);
Routes.put('/:id', UpdateRespostaUsuario);
Routes.delete('/:id', DeleteRespostaUsuario);

export default Routes;

