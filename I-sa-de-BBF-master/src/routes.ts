import express from 'express';

import { authentication } from './app/middlewares';

import DefaultControllersUsers from './app/controllers/DefaultControllers';
import TeleConsultaAPIRoutes from './app/routes/TeleConsultaAPIRoutes';
import UserRoutes from './app/routes/UserAPIRoutes';
import MarketplaceAPIRoutes from './app/routes/MarketplaceAPIRoutes';
import SocialMidiaAPIRoutes from './app/routes/SocialMidiaAPIRoutes';

const router = express.Router();

// --- ROTAS PÚBLICAS (Health Check) ---
// Necessário para o Docker/AWS saber que a API subiu
router.get('/', DefaultControllersUsers);
router.get('/api', DefaultControllersUsers);

// --- ROTAS AUTENTICADAS ---
// Rotas de Usuário (Sugestão: Prefixar no futuro, ex: /api/users)
router.use('/', UserRoutes);

// Outros Microsserviços
router.use('/api/marketplace', authentication, MarketplaceAPIRoutes);
router.use('/api/teleconsulta', authentication, TeleConsultaAPIRoutes);
router.use('/api/social-midia', authentication, SocialMidiaAPIRoutes);

export default router;