import express from 'express';

import { authentication } from './app/middlewares';

import DefaultControllersUsers from './app/controllers/DefaultControllers';
import UserRoutes from './app/routes/UserRoutes';
import ContactRoutes from './app/routes/ContactRoutes';
import UploadRoutes from './app/routes/UploadRoutes';

const router = express.Router();

//default
router.get('/', authentication, DefaultControllersUsers);
router.get('/api', authentication, DefaultControllersUsers);

router.use('/api/user', UserRoutes);

router.use('/api/contact', ContactRoutes);

router.use('/api/upload-files', UploadRoutes);

export default router;
