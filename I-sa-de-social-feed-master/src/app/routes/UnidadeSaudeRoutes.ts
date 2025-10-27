import { Router } from 'express';
import { CreateUnidadeSaude,DeleteUnidadeSaude,GetUnidadeSaude,UpdateUnidadeSaude } from '../controllers/UnidadeSaude';

const Routes = Router();

Routes.post('/create', CreateUnidadeSaude);
Routes.get('/:cnpj?', GetUnidadeSaude);
Routes.put('/:cnpj', UpdateUnidadeSaude);
Routes.delete('/:cnpj', DeleteUnidadeSaude);

export default Routes;

