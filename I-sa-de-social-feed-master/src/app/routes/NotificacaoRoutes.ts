import { Router } from 'express';
import { CreateNotificacao,DeleteNotificacao,GetNotificacao,UpdateNotificacao } from '../controllers/Notificacao';

const Routes = Router();

Routes.post('/create', CreateNotificacao);
Routes.get('/:id?', GetNotificacao);
Routes.put('/:id', UpdateNotificacao);
Routes.delete('/:id', DeleteNotificacao);

export default Routes;

