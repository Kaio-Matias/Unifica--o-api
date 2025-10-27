import { Router } from 'express';
import { CreateFarmacia, DeleteFarmacia, GetFarmacia, UpdateFarmacia } from '../controllers/Farmacia';

const Routes = Router();

Routes.post('/create', CreateFarmacia);
Routes.get('/:cnpj?', GetFarmacia);
Routes.put('/:cnpj', UpdateFarmacia);
Routes.delete('/:cnpj', DeleteFarmacia);

export default Routes;
