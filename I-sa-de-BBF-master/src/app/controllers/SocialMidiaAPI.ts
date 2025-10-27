import { Request, Response } from 'express';
import {
  AulaService,
  CategoriaPostagemService,
  CertificadoService,
  ComentarioService,
  CurtidaService,
  EnderecoService,
  FarmaciaService,
  InscricaoTrilhaService,
  LocalizacaoService,
  ModuloTrilhaService,
  NotificacaoService,
  PostagemService,
  ProfissionalDetalhesService,
  ProgressoAulaService,
  QuestaoQuizService,
  QuizService,
  RespostaUsuarioService,
  SalvamentoService,
  SeguidorService,
  TrilhaService,
  UnidadeSaudeService,
  UploadService,
  StoryService
} from '../services/SocialMidiaAPI';
import { File as MulterFile } from 'multer';
import dotenv from "dotenv";
import FormData from 'form-data';

interface MulterRequest extends Request {
  file?: MulterFile;
}

dotenv.config();

const token = process.env.APP_SECRET_USER!

const handleService = (service: any) => ({
  getAll: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = req.headers['order'];
      const queries = req.query
      const filterObject: any = {};
      let response = null
      if (id) filterObject.id = parseInt(id);
      if (Object.keys(queries).length > 0) filterObject.queries = queries;

      if (filterObject.id && Object.keys(queries).length > 0) {
        response = await service.getByIdAndQuery(queries, id, token);
      }

      if (filterObject.id) {
        response = await service.getById(id, token);
      }

      if (filterObject.queries) {
        response = await service.getByQuery(queries, token, order);
      }

      if (response) {
        res.status(200).json(response.data);
        return;
      }

      response = await service.getAll(token, order);
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const response = await service.create(req.body, token);
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const response = await service.update(id, req.body, token);
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await service.remove(id, token);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  }
});

// Exportando controllers para cada service
export const AulaController = handleService(AulaService);
export const CategoriaPostagemController = handleService(CategoriaPostagemService);
export const CertificadoController = handleService(CertificadoService);
export const ComentarioController = handleService(ComentarioService);
export const CurtidaController = handleService(CurtidaService);
export const EnderecoController = handleService(EnderecoService);
export const FarmaciaController = handleService(FarmaciaService);
export const InscricaoTrilhaController = handleService(InscricaoTrilhaService);
export const LocalizacaoController = handleService(LocalizacaoService);
export const ModuloTrilhaController = handleService(ModuloTrilhaService);
export const NotificacaoController = handleService(NotificacaoService);
export const PostagemController = handleService(PostagemService);
export const ProfissionalDetalhesController = handleService(ProfissionalDetalhesService);
export const ProgressoAulaController = handleService(ProgressoAulaService);
export const QuestaoQuizController = handleService(QuestaoQuizService);
export const QuizController = handleService(QuizService);
export const RespostaUsuarioController = handleService(RespostaUsuarioService);
export const SalvamentoController = handleService(SalvamentoService);
export const SeguidorController = handleService(SeguidorService);
export const TrilhaController = handleService(TrilhaService);
export const UnidadeSaudeController = handleService(UnidadeSaudeService);
export const StoryController = handleService(StoryService);

// Upload
export const UploadController = {
  upload: async (req: MulterRequest, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      const formData = new FormData();
      if (req.file) {
        formData.append('file', req.file.buffer, {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        });
      }

      const response = await UploadService.uploadFile(formData, token);
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  }
};
