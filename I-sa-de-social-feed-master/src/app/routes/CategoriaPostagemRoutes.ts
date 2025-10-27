import { Router } from 'express';
import { CreateCategoriaPostagem, DeleteCategoriaPostagem, GetCategoriaPostagem, UpdateCategoriaPostagem } from '../controllers/CategoriaPostagem';

const Routes = Router();

Routes.post('/create', CreateCategoriaPostagem);
Routes.get('/:id?', GetCategoriaPostagem);
Routes.put('/:id', UpdateCategoriaPostagem);
Routes.delete('/:id', DeleteCategoriaPostagem);

export default Routes;
