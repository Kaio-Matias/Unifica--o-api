import { Router } from 'express';
import multer from 'multer';

import { UserController, ContactController, UploadController } from '../controllers/UsersAPI';

const router = Router();
const upload = multer();

// Rotas de usuário
router.post('/users', UserController.create);
router.post('/users/login', UserController.login);
router.get('/users/verify-login', UserController.verifyLogin);
router.get('/users/:id?', UserController.getAll);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.remove);

// Recuperação de senha
router.post('/users/send-reset-code', UserController.sendResetCode);
router.post('/users/verify-reset-code', UserController.verifyResetCode);
router.post('/users/reset-password', UserController.resetPassword);

// Rotas de contatos
router.post('/contacts', ContactController.create);
router.get('/contacts/:id?', ContactController.getAll);
router.put('/contacts/:id', ContactController.update);
router.delete('/contacts/:id', ContactController.remove);

// Upload de arquivos
router.post('/upload', upload.single('file'), UploadController.upload);

export default router;
