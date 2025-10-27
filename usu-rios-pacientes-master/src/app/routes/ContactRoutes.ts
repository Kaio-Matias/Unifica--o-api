import { Router } from 'express';

// Controllers
import { CreateUserContact, DeleteUserContact, GetUserContact, UpdateUserContact } from '../controllers/Contact';

const contactRoutes = Router();

// Rotas de contact
contactRoutes.post('/create', CreateUserContact);
contactRoutes.get('/:id?', GetUserContact);
contactRoutes.put('/:id', UpdateUserContact);
contactRoutes.delete('/:id', DeleteUserContact);

export default contactRoutes;
