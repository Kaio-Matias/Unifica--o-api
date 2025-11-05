import express from 'express';

import { authentication } from './app/middlewares';

import DefaultControllersUsers from './app/controllers/DefaultControllers';
import TeleConsultaAPIRoutes from './app/routes/TeleConsultaAPIRoutes';
import UserRoutes from './app/routes/UserAPIRoutes';
import MarketplaceAPIRoutes from './app/routes/MarketplaceAPIRoutes';
import SocialMidiaAPIRoutes from './app/routes/SocialMidiaAPIRoutes';

const router = express.Router();

//default
router.get('/', authentication, DefaultControllersUsers);
router.get('/api', authentication, DefaultControllersUsers);

router.use('/', UserRoutes);
router.use('/api/marketplace', authentication, MarketplaceAPIRoutes);
router.use('/api/teleconsulta', authentication, TeleConsultaAPIRoutes);
router.use('/api/social-midia', authentication, SocialMidiaAPIRoutes);

export default router;
