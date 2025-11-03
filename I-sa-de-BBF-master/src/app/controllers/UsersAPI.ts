
import { Request, Response } from 'express';
import { userService } from '../services/UserAPI/User';
import { contactService } from '../services/UserAPI/Contact';
import { uploadService } from '../services/UserAPI/UploadFiles';
import dotenv from "dotenv";


import FormData from 'form-data';

interface MulterRequest extends Request {
  file?: Express.Multer.File; // CORREÇÃO AQUI
}

dotenv.config();

const token = process.env.APP_SECRET_USER!

export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const result = await userService.createUser(req.body, token);
      return res.status(201).json(result.data);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar usuário', detail: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res.status(401).json({ error: 'Credenciais inválidas', detail: err.message });
    }
  },

  async verifyLogin(req: Request, res: Response) {
    try {
      const result = await userService.verifyLogin(token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res.status(403).json({ error: 'Token inválido', detail: err.message });
    }
  },

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
        response = await userService.getUserByIdAndQuery(queries, id, token);
      }

      if (filterObject.id) {
        response = await userService.getUserById(id, token);
      }

      if (filterObject.queries) {
        response = await userService.getUserByQuery(queries, token, order);
      }

      if (response) {
        res.status(200).json(response.data);
        return;
      }

      response = await userService.getUsers(token, order);
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await userService.updateUser(Number(req.params.id), req.body, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar usuário', detail: err.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number(req.params.id), token);
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar usuário', detail: err.message });
    }
  },

  async sendResetCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await userService.sendResetPasswordCode(email, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao enviar código', detail: err.message });
    }
  },

  async verifyResetCode(req: Request, res: Response) {
    try {
      const { email, otpCode } = req.body;
      const result = await userService.verifyResetCode(email, otpCode, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao verificar código', detail: err.message });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, password, repeatPassword, otpCode } = req.body;
      const result = await userService.resetPassword(email, password, repeatPassword, otpCode, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao redefinir senha', detail: err.message });
    }
  },
};


export const ContactController = {
  async create(req: Request, res: Response) {
    try {
      const data = await contactService.createContact(req.body, token);
      res.status(201).json(data.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

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
        response = await contactService.getContactByIdAndQuery(queries, id, token);
      }

      if (filterObject.id) {
        response = await contactService.getContactById(id, token);
      }

      if (filterObject.queries) {
        response = await contactService.getContactByQuery(queries, token, order);
      }

      if (response) {
        res.status(200).json(response.data);
      }

      response = await contactService.getContacts(token, order);
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await contactService.updateContact(+id, req.body, token);
      res.json(data.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await contactService.deleteContact(+id, token);
      res.status(204).send();
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  }
};

export const UploadController = {
  async upload(req: MulterRequest, res: Response) {
    try {

      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
      }

      const formData = new FormData();

      // Adiciona o arquivo como um stream
      formData.append(
        'file',
        req.file.buffer,
        {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        }
      );

      const response = await uploadService.uploadFiles(formData, token);

      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  }
};


