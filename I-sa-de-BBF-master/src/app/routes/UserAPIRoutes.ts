import { Router } from 'express';
import UsersAPI from '../controllers/UsersAPI';
import { authMiddleware } from '@app/middlewares';

const routes = Router();

// Rotas de Usuário (CORRIGIDAS: prefixo /users removido)
routes.post('/', UsersAPI.createUser);
routes.get('/', authMiddleware, UsersAPI.getUser);
routes.put('/:id', authMiddleware, UsersAPI.updateUser);
routes.delete('/:id', authMiddleware, UsersAPI.deleteUser);
routes.post('/login', UsersAPI.loginUser);
routes.post('/verify-login', UsersAPI.verifyLogin);
routes.post('/send-reset-code', UsersAPI.sendResetCode);
routes.post('/verify-reset-code', UsersAPI.verifyResetCode);
routes.post('/reset-password', UsersAPI.resetPassword);

// --- Adicionando as outras rotas do microsserviço que estavam em falta no seu BFF ---
// Isto garante que não terá erros 404 no futuro para estas rotas.
routes.post('/contact', authMiddleware, UsersAPI.createUserContact);
routes.get('/contact', authMiddleware, UsersAPI.getUserContact);
routes.put('/contact/:id', authMiddleware, UsersAPI.updateUserContact);
routes.delete('/contact/:id', authMiddleware, UsersAPI.deleteUserContact);

routes.post('/upload', authMiddleware, UsersAPI.uploadFile);

export default routes;