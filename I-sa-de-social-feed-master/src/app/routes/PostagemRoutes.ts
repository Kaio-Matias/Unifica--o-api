import { Router } from 'express';
import { CreatePostagem, DeletePostagem, GetPostagem, UpdatePostagem } from '../controllers/Postagem';

const Routes = Router();

Routes.post('/create', CreatePostagem);
Routes.get('/:id?', GetPostagem);
Routes.put('/:id', UpdatePostagem);
Routes.delete('/:id', DeletePostagem);

export default Routes;

