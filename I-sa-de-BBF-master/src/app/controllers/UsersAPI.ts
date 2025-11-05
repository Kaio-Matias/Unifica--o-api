import { Request, Response } from 'express';
import { userService } from '../services/UserAPI/User';
import { contactService } from '../services/UserAPI/Contact';
import { uploadService } from '../services/UserAPI/UploadFiles';
import dotenv from 'dotenv';

// ### CORREÇÃO ###
// Importando os serviços corretos para a orquestração
import { ProfissionalDetalhesService } from '../services/SocialMidiaAPI';
import { ClinicService } from '../services/TeleConsultaAPI';
// ### FIM DA CORREÇÃO ###

import FormData from 'form-data';

interface MulterRequest extends Request {
  file?: Express.Multer.File; // CORREÇÃO AQUI
}

dotenv.config();

const token = process.env.APP_SECRET_USER!;

export const UserController = {
  /**
   * ===========================================================================
   * ### MÉTODO CREATE CORRIGIDO PARA ORQUESTRAÇÃO ###
   * ===========================================================================
   */
  async create(req: Request, res: Response) {
    const { body } = req;
    let createdUser: any = null; // Armazena o usuário base após a criação

    try {
      // --- ETAPA 1: Criar o usuário base no microserviço de Usuários ---
      // O 'token' é o APP_SECRET_USER, necessário para a auth entre serviços
      // O microserviço de usuário salvará apenas os campos que ele conhece
      // (nome, email, cpf, password, user_type, etc.)
      const result = await userService.createUser(body, token);
      createdUser = result.data.user; // Salva a resposta da criação do usuário base

      // Se não houver ID, algo muito errado aconteceu
      if (!createdUser || !createdUser.id) {
        throw new Error('Falha ao obter ID do usuário criado.');
      }

      const userId = createdUser.id;
      const userType = body.user_type;

      // --- ETAPA 2: Orquestração ---
      // Com base no user_type, chama o microserviço correspondente
      switch (userType) {
        /**
         * Caso seja um Profissional:
         * Salva os detalhes no microserviço Social-Feed.
         * Endpoint: POST /profissional-detalhes
         */
        case 'professional': {
          const professionalData = {
            id_usuario: userId,
            area_atuacao: body.area_atuacao,
            numero_registro: body.numero_registro,
            estado_atuacao: body.estado_atuacao,
            especialidade: body.especialidade,
            sobre: body.sobre || null, // Opcional
          };

          // Chama o método create do ProfissionalDetalhesService
          await ProfissionalDetalhesService.create(
            professionalData,
            token
          );
          break;
        }

        /**
         * Caso seja uma Clínica:
         * Salva os detalhes no microserviço TeleConsulta.
         * Endpoint: POST /clinics
         */
        case 'clinic': {
          const clinicData = {
            id_usuario: userId,
            nome_fantasia: body.nome_fantasia,
            cnpj: body.cnpj,
            tipo_unidade: body.tipo_unidade,
            nome_responsavel: body.nome_responsavel,
            cpf_responsavel: body.cpf_responsavel,
            email_responsavel: body.email_responsavel,
            telefone_responsavel: body.telefone_responsavel,
          };

          // Chama o método create do ClinicService
          await ClinicService.create(clinicData, token);
          break;
        }

        /**
         * Caso seja um Paciente (ou default):
         * Nenhum passo adicional é necessário.
         */
        case 'pacient':
        default:
          break;
      }

      // --- ETAPA 3: Sucesso ---
      // Se chegou até aqui, todas as etapas foram concluídas com sucesso.
      return res.status(201).json(createdUser);

    } catch (error) {
      // --- ETAPA 4: Tratamento de Erro e Rollback ---
      const { response } = error;

      // Se 'createdUser' não for nulo, significa que a ETAPA 1 foi bem-sucedida,
      // mas a ETAPA 2 (ex: salvar dados profissionais) falhou.
      // Devemos deletar o usuário base para evitar dados órfãos.
      if (createdUser && createdUser.id) {
        console.error(
          `[BFF] ERRO DE ORQUESTRAÇÃO. Iniciando rollback para usuário: ${createdUser.id}`,
          error.message
        );
        try {
          // Tenta fazer o rollback
          await userService.deleteUser(createdUser.id, token);
          console.log(`[BFF] Rollback do usuário ${createdUser.id} concluído.`);
        } catch (rollbackError) {
          console.error(
            `[BFF] FALHA CRÍTICA NO ROLLBACK: Não foi possível deletar o usuário órfão ${createdUser.id}`,
            rollbackError.message
          );
        }
      }

      // Retorna o erro original (seja da ETAPA 1 ou ETAPA 2)
      if (response) {
        // Repassa o erro do microserviço
        return res.status(response.status).json(response.data);
      }
      // Erro genérico
      return res
        .status(500)
        .json({ error: 'Erro ao criar usuário', detail: error.message });
    }
  },
  //
  // --- RESTANTE DO CÓDIGO ORIGINAL (SEM ALTERAÇÕES) ---
  //

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res
        .status(401)
        .json({ error: 'Credenciais inválidas', detail: err.message });
    }
  },

  async verifyLogin(req: Request, res: Response) {
    try {
      const result = await userService.verifyLogin(token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res
        .status(403)
        .json({ error: 'Token inválido', detail: err.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = req.headers['order'];
      const queries = req.query;
      const filterObject: any = {};
      let response = null;
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
      const result = await userService.updateUser(
        Number(req.params.id),
        req.body,
        token
      );
      return res.status(200).json(result.data);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao atualizar usuário', detail: err.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number(req.params.id), token);
      return res.status(204).send();
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Erro ao deletar usuário', detail: err.message });
    }
  },

  async sendResetCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await userService.sendResetPasswordCode(email, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao enviar código', detail: err.message });
    }
  },

  async verifyResetCode(req: Request, res: Response) {
    try {
      const { email, otpCode } = req.body;
      const result = await userService.verifyResetCode(email, otpCode, token);
      return res.status(200).json(result.data);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao verificar código', detail: err.message });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, password, repeatPassword, otpCode } = req.body;
      const result = await userService.resetPassword(
        email,
        password,
        repeatPassword,
        otpCode,
        token
      );
      return res.status(200).json(result.data);
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao redefinir senha', detail: err.message });
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
      const queries = req.query;
      const filterObject: any = {};
      let response = null;
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
  },
};

export const UploadController = {
  async upload(req: MulterRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
      }

      const formData = new FormData();

      // Adiciona o arquivo como um stream
      formData.append('file', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });

      const response = await uploadService.uploadFiles(formData, token);

      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  },
};

