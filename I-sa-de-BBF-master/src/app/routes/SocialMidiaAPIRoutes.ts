import { Router } from 'express';
import multer from 'multer';

// Controllers
import {
  AulaController,
  CategoriaPostagemController,
  CertificadoController,
  ComentarioController,
  CurtidaController,
  EnderecoController,
  FarmaciaController,
  InscricaoTrilhaController,
  LocalizacaoController,
  ModuloTrilhaController,
  NotificacaoController,
  PostagemController,
  ProfissionalDetalhesController,
  ProgressoAulaController,
  QuestaoQuizController,
  QuizController,
  RespostaUsuarioController,
  SalvamentoController,
  SeguidorController,
  StoryController,
  TrilhaController,
  UnidadeSaudeController,
  UploadController
} from '../controllers/SocialMidiaAPI';

const upload = multer(); // Middleware para upload de arquivos
const socialMidiaRoutes = Router();

// Helper para rotas CRUD genéricas
const registerCrudRoutes = (basePath: string, controller: any) => {
  socialMidiaRoutes.get(`/${basePath}/:id?`, controller.getAll);
  socialMidiaRoutes.post(`/${basePath}/create`, controller.create);
  socialMidiaRoutes.put(`/${basePath}/:id`, controller.update);
  socialMidiaRoutes.delete(`/${basePath}/:id`, controller.remove);
};

// Registrar rotas para cada recurso
registerCrudRoutes('aula', AulaController);
registerCrudRoutes('categoria-postagem', CategoriaPostagemController);
registerCrudRoutes('certificado', CertificadoController);
registerCrudRoutes('comentario', ComentarioController);
registerCrudRoutes('curtida', CurtidaController);
registerCrudRoutes('endereco', EnderecoController);
registerCrudRoutes('farmacia', FarmaciaController);
registerCrudRoutes('inscricao-trilha', InscricaoTrilhaController);
registerCrudRoutes('localizacao', LocalizacaoController);
registerCrudRoutes('modulo-trilha', ModuloTrilhaController);
registerCrudRoutes('notificacao', NotificacaoController);
registerCrudRoutes('postagem', PostagemController);
registerCrudRoutes('profissional-detalhes', ProfissionalDetalhesController);
registerCrudRoutes('progresso-aula', ProgressoAulaController);
registerCrudRoutes('questao-quiz', QuestaoQuizController);
registerCrudRoutes('quiz', QuizController);
registerCrudRoutes('resposta-usuario', RespostaUsuarioController);
registerCrudRoutes('salvamento', SalvamentoController);
registerCrudRoutes('seguidor', SeguidorController);
registerCrudRoutes('trilha', TrilhaController);
registerCrudRoutes('unidade-saude', UnidadeSaudeController);
registerCrudRoutes('story', StoryController);
// Upload de arquivos
socialMidiaRoutes.post('/upload-files', upload.single('file'), UploadController.upload);

export default socialMidiaRoutes;
