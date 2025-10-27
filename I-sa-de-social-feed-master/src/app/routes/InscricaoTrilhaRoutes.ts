import { Router } from 'express';
import { CreateInscricaoTrilha, DeleteInscricaoTrilha, GetInscricaoTrilha, UpdateInscricaoTrilha, } from '../controllers/InscricaoTrilha';

const Routes = Router();

Routes.post('/create', CreateInscricaoTrilha);
Routes.get('/:id?', GetInscricaoTrilha);
Routes.put('/:id', UpdateInscricaoTrilha);
Routes.delete('/:id', DeleteInscricaoTrilha);

export default Routes;
