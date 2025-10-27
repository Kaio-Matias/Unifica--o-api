import { Router } from 'express';
import { CreateComentario, DeleteComentario, GetComentario, UpdateComentario } from '../controllers/Comentario';

const Routes = Router();

Routes.post('/create', CreateComentario);
Routes.get('/:id?', GetComentario);
Routes.put('/:id', UpdateComentario);
Routes.delete('/:id', DeleteComentario);

export default Routes;
