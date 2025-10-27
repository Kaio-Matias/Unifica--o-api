import express from 'express';

import { authentication } from './app/middlewares';

import DefaultControllersUsers from './app/controllers/DefaultControllers';

import UploadRoutes from './app/routes/UploadRoutes';

import AulaRoutes from './app/routes/AulaRoutes';
import CategoriaPostagemRoutes from './app/routes/CategoriaPostagemRoutes';
import CertificadoRoutes from './app/routes/CertificadoRoutes';
import ComentarioRoutes from './app/routes/ComentarioRoutes';
import CurtidaRoutes from './app/routes/CurtidaRoutes';
import EnderecoRoutes from './app/routes/EnderecoRoutes';
import FarmaciaRoutes from './app/routes/FarmaciaRoutes';
import InscricaoTrilhaRoutes from './app/routes/InscricaoTrilhaRoutes';
import LocalizacaoRoutes from './app/routes/LocalizacaoRoutes';
import ModuloTrilhaRoutes from './app/routes/ModuloTrilhaRoutes';
import NotificacaoRoutes from './app/routes/NotificacaoRoutes';
import PostagemRoutes from './app/routes/PostagemRoutes';
import ProfissionalDetalhesRoutes from './app/routes/ProfissionalDetalhesRoutes';
import ProgressoAulaRoutes from './app/routes/ProgressoAulaRoutes';
import QuestaoQuizRoutes from './app/routes/QuestaoQuizRoutes';
import QuizRoutes from './app/routes/QuizRoutes';
import RespostaUsuarioRoutes from './app/routes/RespostaUsuarioRoutes';
import SalvamentoRoutes from './app/routes/SalvamentoRoutes';
import SeguidorRoutes from './app/routes/SeguidorRoutes';
import TrilhaRoutes from './app/routes/TrilhaRoutes';
import UnidadeSaudeRoutes from './app/routes/UnidadeSaudeRoutes';
import StoryRoutes from './app/routes/StoryRoutes';
const router = express.Router();

//default
router.get('/', authentication, DefaultControllersUsers);
router.get('/api', authentication, DefaultControllersUsers);

router.use('/api/upload-files', authentication, UploadRoutes);

router.use('/api/aulas', authentication, AulaRoutes);
router.use('/api/categoria-postagens', authentication, CategoriaPostagemRoutes);
router.use('/api/certificados', authentication, CertificadoRoutes);
router.use('/api/comentarios', authentication, ComentarioRoutes);
router.use('/api/curtidas', authentication, CurtidaRoutes);
router.use('/api/enderecos', authentication, EnderecoRoutes);
router.use('/api/pharmacy', authentication, FarmaciaRoutes);
router.use('/api/inscricao-trilhas', authentication, InscricaoTrilhaRoutes);
router.use('/api/localizacao', authentication, LocalizacaoRoutes);
router.use('/api/modulo-trilha', authentication, ModuloTrilhaRoutes);
router.use('/api/notificacoes', authentication, NotificacaoRoutes);
router.use('/api/postagens', authentication, PostagemRoutes);
router.use('/api/profissional-detalhes', authentication, ProfissionalDetalhesRoutes);
router.use('/api/progresso-aula', authentication, ProgressoAulaRoutes);
router.use('/api/questao-quiz', authentication, QuestaoQuizRoutes);
router.use('/api/quiz', authentication, QuizRoutes);
router.use('/api/resposta-usuario', authentication, RespostaUsuarioRoutes);
router.use('/api/salvamentos', authentication, SalvamentoRoutes);
router.use('/api/seguidores', authentication, SeguidorRoutes);
router.use('/api/trilha', authentication, TrilhaRoutes);
router.use('/api/unidades-saude', authentication, UnidadeSaudeRoutes);
router.use('/api/story', authentication, StoryRoutes);

export default router;
