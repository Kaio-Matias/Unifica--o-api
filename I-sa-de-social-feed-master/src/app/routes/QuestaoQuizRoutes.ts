import { Router } from 'express';
import { CreateQuestaoQuiz, DeleteQuestaoQuiz, GetQuestaoQuiz, UpdateQuestaoQuiz } from '../controllers/QuestaoQuiz';

const Routes = Router();

Routes.post('/create', CreateQuestaoQuiz);
Routes.get('/:id?', GetQuestaoQuiz);
Routes.put('/:id', UpdateQuestaoQuiz);
Routes.delete('/:id', DeleteQuestaoQuiz);

export default Routes;

