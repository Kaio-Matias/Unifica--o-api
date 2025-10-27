import { Router } from 'express';
import multer from 'multer';

import {
  AgendamentoConsultaController,
  AvaliacaoController,
  ClinicController,
  ClinicExamController,
  ClinicPromocaoController,
  ExamAgendamentoController,
  ExamPaymentController,
  ConexaoProfissionalClinicaController,
  DocumentController,
  EnderecosController,
  UploadController
} from '../controllers/TeleConsultaAPI';

const router = Router();
const upload = multer();

// Função auxiliar para registrar rotas padrão
const registerCrudRoutes = (basePath: string, controller: any) => {
  router.get(`/${basePath}/:id?`, controller.getAll);
  router.post(`/${basePath}/create`, controller.create);
  router.put(`/${basePath}/:id`, controller.update);
  router.delete(`/${basePath}/:id`, controller.remove);
};

// Registrar rotas CRUD
registerCrudRoutes('agendamento-consulta', AgendamentoConsultaController);
registerCrudRoutes('avaliacao', AvaliacaoController);
registerCrudRoutes('clinic', ClinicController);
registerCrudRoutes('clinic-exam', ClinicExamController);
registerCrudRoutes('clinic-promocao', ClinicPromocaoController);
registerCrudRoutes('exam-agendamento', ExamAgendamentoController);
registerCrudRoutes('exam-payment', ExamPaymentController);
registerCrudRoutes('conexao-profissional-clinica', ConexaoProfissionalClinicaController);
registerCrudRoutes('document', DocumentController);
registerCrudRoutes('enderecos', EnderecosController);

// Upload de arquivos
router.post('/upload-files', upload.single('file'), UploadController.upload);

export default router;
