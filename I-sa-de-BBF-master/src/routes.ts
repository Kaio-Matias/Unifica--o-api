import express from 'express';

// Importação do Middleware de Autenticação
import { authentication } from './app/middlewares';

// Importação dos Controllers e Rotas
import DefaultControllersUsers from './app/controllers/DefaultControllers';
import TeleConsultaAPIRoutes from './app/routes/TeleConsultaAPIRoutes';
import UserRoutes from './app/routes/UserAPIRoutes';
import MarketplaceAPIRoutes from './app/routes/MarketplaceAPIRoutes';
import SocialMidiaAPIRoutes from './app/routes/SocialMidiaAPIRoutes';

const router = express.Router();

// ---------------------------------------------------------
// 1. Rotas Públicas & Health Check
// ---------------------------------------------------------
// É crucial que estas venham primeiro para verificação de status (AWS/Docker)
router.get('/', DefaultControllersUsers);
router.get('/api', DefaultControllersUsers);

// ---------------------------------------------------------
// 2. Rotas de Usuário (Auth e Perfil)
// ---------------------------------------------------------
// Montado na raiz para permitir: POST /login, POST /register, POST /users
// Nota: O arquivo UserAPIRoutes deve gerenciar internamente quais rotas
// precisam do middleware 'authentication' e quais são públicas.
router.use('/', UserRoutes); 

// ---------------------------------------------------------
// 3. Rotas dos Microsserviços (Protegidas)
// ---------------------------------------------------------
// Todas as rotas abaixo exigem Token Bearer (authentication)

// API Marketplace (Compras, Produtos)
router.use('/api/marketplace', authentication, MarketplaceAPIRoutes);

// API Teleconsulta (Agendamentos, Médicos)
router.use('/api/teleconsulta', authentication, TeleConsultaAPIRoutes);

// API Social (Feed, Posts, Comentários)
router.use('/api/social-midia', authentication, SocialMidiaAPIRoutes);

export default router;