import { Router } from 'express';
import { CreateQuiz, DeleteQuiz, GetQuiz, UpdateQuiz } from '../controllers/Quiz';

const Routes = Router();

Routes.post('/create', CreateQuiz);
Routes.get('/:id?', GetQuiz);
Routes.put('/:id', UpdateQuiz);
Routes.delete('/:id', DeleteQuiz);

export default Routes;

