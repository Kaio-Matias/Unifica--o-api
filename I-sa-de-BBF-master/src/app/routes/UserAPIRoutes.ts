import { Router } from 'express';
// --- CORREÇÕES AQUI ---
import * as UsersAPI from "@controllers/UsersAPI"; // Corrigido de @app/controllers
import { authentication as auth } from '@middlewares/index'; // Corrigido de @app/middlewares e importando 'authentication'
import multer from 'multer'; // Importado diretamente
// --- FIM DAS CORREÇÕES ---

const userAPIRoutes = Router();
const upload = multer(); // Inicializando o multer

// Rotas de Usuário
userAPIRoutes.get(
  '/user/:id',
  auth, // Protegido
  UsersAPI.UserController.getAll // CORREÇÃO: Chamada correta
);
userAPIRoutes.get(
  '/user',
  auth, // Protegido
  UsersAPI.UserController.getAll // CORREÇÃO: Chamada correta
);
userAPIRoutes.post(
  '/user/create',
  UsersAPI.UserController.create // CORREÇÃO: Chamada correta
);
userAPIRoutes.put(
  '/user/update/:id',
  auth, // Protegido
  UsersAPI.UserController.update // CORREÇÃO: Chamada correta
);
userAPIRoutes.delete(
  '/user/delete/:id',
  auth, // Protegido
  UsersAPI.UserController.remove // CORREÇÃO: Chamada correta
);

// Rotas de Contato
userAPIRoutes.get(
  '/contact/:id',
  auth, // Protegido
  UsersAPI.ContactController.getAll // CORREÇÃO: Chamada correta
);
userAPIRoutes.post(
  '/contact/create', // CORREÇÃO: Rota corrigida (sem :id)
  auth, // Protegido
  UsersAPI.ContactController.create // CORREÇÃO: Chamada correta
);
userAPIRoutes.put(
  '/contact/update/:id',
  auth, // Protegido
  UsersAPI.ContactController.update // CORREÇÃO: Chamada correta
);
userAPIRoutes.delete(
  '/contact/delete/:id',
  auth, // Protegido
  UsersAPI.ContactController.remove // CORREÇÃO: Chamada correta
);

// Rota de Upload
userAPIRoutes.post(
  '/upload-files', // CORREÇÃO: Rota corrigida
  auth, // Protegido
  upload.single('file'),
  UsersAPI.UploadController.upload // CORREÇÃO: Chamada correta
);

// Rotas de Autenticação (Públicas)
userAPIRoutes.post(
  '/user/login',
  UsersAPI.UserController.login // CORREÇÃO: Chamada correta
);
userAPIRoutes.post(
  '/user/verify-login',
  auth, // Protegido (verifica um token existente)
  UsersAPI.UserController.verifyLogin // CORREÇÃO: Chamada correta
);
userAPIRoutes.post(
  '/user/password/send-code',
  UsersAPI.UserController.sendResetCode // CORREÇÃO: Chamada correta
);
userAPIRoutes.post(
  '/user/password/verify-code',
  UsersAPI.UserController.verifyResetCode // CORREÇÃO: Chamada correta
);
userAPIRoutes.post(
  '/user/password/reset',
  UsersAPI.UserController.resetPassword // CORREÇÃO: Chamada correta
);

export default userAPIRoutes;