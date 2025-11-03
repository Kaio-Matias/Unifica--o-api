import { Request, Response } from 'express';
import {
  CarrinhoService,
  MedicamentoService,
  PagamentoService,
  PedidoService,
  PharmacyService,
  PharmacyProductService,
  PromocaoService,
  ReceitaDigitalService,
  UploadService
} from '../services/MarketplaceAPI';

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

export const CarrinhoController = handleService(CarrinhoService);
export const MedicamentoController = handleService(MedicamentoService);
export const PagamentoController = handleService(PagamentoService);
export const PedidoController = handleService(PedidoService);
export const PharmacyController = handleService(PharmacyService);
export const PharmacyProductController = handleService(PharmacyProductService);
export const PromocaoController = handleService(PromocaoService);
export const ReceitaDigitalController = handleService(ReceitaDigitalService);

export const UploadController = {
  upload: async (req: MulterRequest, res: Response) => {
    try {
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
