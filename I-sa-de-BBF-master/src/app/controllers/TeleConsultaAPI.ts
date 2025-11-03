import { Request, Response } from 'express';
import {
  AgendamentoConsultaService,
  AvaliacaoService,
  ClinicService,
  ClinicExamService,
  ClinicPromocaoService,
  ExamAgendamentoService,
  ExamPaymentService,
  ConexaoProfissionalClinicaService,
  DocumentService,
  EnderecosService,
  UploadService
} from '../services/TeleConsultaAPI';
import dotenv from "dotenv";



import FormData from 'form-data';

interface MulterRequest extends Request {
  file?: Express.Multer.File; 
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
        return ;
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

// Exporta os controllers
export const AgendamentoConsultaController = handleService(AgendamentoConsultaService);
export const AvaliacaoController = handleService(AvaliacaoService);
export const ClinicController = handleService(ClinicService);
export const ClinicExamController = handleService(ClinicExamService);
export const ClinicPromocaoController = handleService(ClinicPromocaoService);
export const ExamAgendamentoController = handleService(ExamAgendamentoService);
export const ExamPaymentController = handleService(ExamPaymentService);
export const ConexaoProfissionalClinicaController = handleService(ConexaoProfissionalClinicaService);
export const DocumentController = handleService(DocumentService);
export const EnderecosController = handleService(EnderecosService);

// Controller de upload separado por ser diferente
export const UploadController = {
  upload: async (req: MulterRequest, res: Response) => {
    try {
      const formData = new FormData();
      if (req.file) {
        formData.append('file', new Blob([req.file.buffer]), req.file.originalname);
      }
      const response = await UploadService.uploadFile(formData, token);
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  }
};
