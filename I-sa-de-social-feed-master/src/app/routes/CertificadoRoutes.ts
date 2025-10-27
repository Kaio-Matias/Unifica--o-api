import { Router } from 'express';
import { CreateCertificado, DeleteCertificado, GetCertificado, UpdateCertificado } from '../controllers/Certificado';

const Routes = Router();

Routes.post('/create', CreateCertificado);
Routes.get('/:id?', GetCertificado);
Routes.put('/:id', UpdateCertificado);
Routes.delete('/:id', DeleteCertificado);

export default Routes;
