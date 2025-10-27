import { Router } from 'express';
import { CreateLocalizacao, DeleteLocalizacao, GetLocalizacao, UpdateLocalizacao } from '../controllers/Localizacao';

const Routes = Router();

Routes.post('/create', CreateLocalizacao);
Routes.get('/:id?', GetLocalizacao);
Routes.put('/:id', UpdateLocalizacao);
Routes.delete('/:id', DeleteLocalizacao);

export default Routes;
