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

router.use('/api/user', authentication, UserRoutes);

router.use('/api/contact', authentication, ContactRoutes);

router.use('/api/upload-files', authentication, UploadRoutes);

export default router;
