import { Router } from 'express';
import * as UsersAPI from "@app/controllers/UsersAPI"; // <-- CORREÇÃO AQUI
import { auth } from '@app/middlewares';
import { upload } from '@app/middlewares/multer';

const userAPIRoutes = Router();

// Rotas de Usuário
userAPIRoutes.get(
  '/user/:id',
  auth,
  UsersAPI.getUserById
);
userAPIRoutes.get(
  '/user',
  auth,
  UsersAPI.getUserByQuery
);
userAPIRoutes.post(
  '/user/create',
  auth,
  UsersAPI.createUser
);
userAPIRoutes.put(
  '/user/update/:id',
  auth,
  UsersAPI.updateUser
);
userAPIRoutes.delete(
  '/user/delete/:id',
  auth,
  UsersAPI.deleteUser
);

// Rotas de Contato
userAPIRoutes.get(
  '/contact/:id',
  auth,
  UsersAPI.getUserContact
);
userAPIRoutes.post(
  '/contact/create/:id',
  auth,
  UsersAPI.createUserContact
);
userAPIRoutes.put(
  '/contact/update/:id',
  auth,
  UsersAPI.updateUserContact
);
userAPIRoutes.delete(
  '/contact/delete/:id',
  auth,
  UsersAPI.deleteUserContact
);

// Rota de Upload
userAPIRoutes.post(
  '/upload/:id',
  auth,
  upload.single('file'),
  UsersAPI.uploadFiles
);

// Rotas de Autenticação
userAPIRoutes.post(
  '/user/login',
  auth,
  UsersAPI.loginUser
);
userAPIRoutes.post(
  '/user/verify-login',
  auth,
  UsersAPI.verifyLogin
);
userAPIRoutes.post(
  '/user/password/send-code',
  auth,
  UsersAPI.sendResetPasswordCodeInEmail
);
userAPIRoutes.post(
  '/user/password/verify-code',
  auth,
  UsersAPI.verifyPasswordCodeInEmail
);
userAPIRoutes.post(
  '/user/password/reset',
  auth,
  UsersAPI.resetPassword
);

export default userAPIRoutes;
