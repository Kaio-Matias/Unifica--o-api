import { Router } from 'express';

// Controllers
import {
  CreateUser,
  DeleteUser,
  GetUser,
  LoginUser,
  ResetPassword,
  SendResetPasswordCodeInEmail,
  UpdateUser,
  VerifyLoginUser,
  VerifyPasswordCodeInEmail
} from '../controllers/User';

const userRoutes = Router();

// Rotas de usuário
userRoutes.post('/create', CreateUser);
userRoutes.post('/login', LoginUser);
userRoutes.post('/verify-login', VerifyLoginUser);
userRoutes.get('/:id?', GetUser);
userRoutes.put('/:id', UpdateUser);
userRoutes.delete('/:id', DeleteUser);

// Redefinição de senha
userRoutes.post('/password/send-code', SendResetPasswordCodeInEmail);
userRoutes.post('/password/verify-code', VerifyPasswordCodeInEmail);
userRoutes.post('/password/reset', ResetPassword);

export default userRoutes;
