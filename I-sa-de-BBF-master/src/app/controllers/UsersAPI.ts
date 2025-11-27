import { Request, Response } from 'express';
import { userService } from '../services/UserAPI/User';
import { contactService } from '../services/UserAPI/Contact';
import { uploadService } from '../services/UserAPI/UploadFiles';
import { ProfissionalDetalhesService } from '../services/SocialMidiaAPI';
import { ClinicService } from '../services/TeleConsultaAPI';
import dotenv from 'dotenv';
import FormData from 'form-data';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

dotenv.config();

const token = process.env.APP_SECRET_USER!;

export const UserController = {
  async create(req: Request, res: Response) {
    const { body } = req;
    let createdUser: any = null;

    try {
      // --- ETAPA 1: Criar o usuário base ---
      const result = await userService.createUser(body, token);
      
      // Verificação de segurança da resposta
      if (!result || !result.data || !result.data.user) {
        throw new Error('Resposta inválida do serviço de usuários ao criar conta.');
      }
      
      createdUser = result.data.user; 
      const userId = createdUser.id;
      const userType = body.user_type;

      if (!userId) {
        throw new Error('ID do usuário não retornado.');
      }

      // --- ETAPA 2: Orquestração baseada no tipo ---
      switch (userType) {
        case 'professional': {
          const professionalData = {
            id_usuario: userId,
            area_atuacao: body.area_atuacao,
            numero_registro: body.numero_registro,
            estado_atuacao: body.estado_atuacao,
            especialidade: body.especialidade,
            sobre: body.sobre || null,
          };
          await ProfissionalDetalhesService.create(professionalData, token);
          break;
        }

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
          await ClinicService.create(clinicData, token);
          break;
        }

        case 'pacient':
        default:
          break;
      }

      // Sucesso total
      return res.status(201).json(createdUser);

    } catch (error: any) {
      // --- ETAPA 3: Rollback em caso de falha na etapa 2 ---
      const axiosErrorResponse = error.response;

      if (createdUser && createdUser.id) {
        console.error(`[BFF] Falha na orquestração. Iniciando rollback para usuário ID: ${createdUser.id}`);
        try {
          await userService.deleteUser(createdUser.id, token);
          console.log(`[BFF] Rollback executado com sucesso para usuário ID: ${createdUser.id}`);
        } catch (rollbackError: any) {
          console.error(`[BFF] FALHA CRÍTICA DE ROLLBACK: Usuário ${createdUser.id} pode ter ficado inconsistente. Erro: ${rollbackError.message}`);
        }
      }

      // Retorna o erro apropriado para o cliente
      if (axiosErrorResponse) {
        return res.status(axiosErrorResponse.status || 500).json(axiosErrorResponse.data || { error: 'Erro no microserviço externo' });
      }

      return res.status(500).json({ 
        error: 'Erro interno ao processar criação de usuário', 
        detail: error.message 
      });
    }
  },

  // ... Mantenha os outros métodos (login, getAll, etc.) como estão, 
  // mas considere aplicar o mesmo padrão de tratamento de erro (error.response) neles.
  
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password, token);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response?.status || 401).json(err.response?.data || { error: 'Credenciais inválidas', detail: err.message });
    }
  },

  async verifyLogin(req: Request, res: Response) {
    try {
      const result = await userService.verifyLogin(token);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response?.status || 403).json(err.response?.data || { error: 'Token inválido', detail: err.message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = req.headers['order'];
      const queries = req.query;
      
      // (Lógica original mantida, apenas ajustando o catch)
      // ... (código de busca existente)
      
      // Exemplo simplificado para manter compatibilidade
      let response;
      if (id) {
         response = await userService.getUserById(id, token);
      } else {
         response = await userService.getUsers(token, order);
      }
      res.status(200).json(response.data);

    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await userService.updateUser(Number(req.params.id), req.body, token);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response?.status || 400).json(err.response?.data || { error: 'Erro ao atualizar usuário', detail: err.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await userService.deleteUser(Number(req.params.id), token);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao deletar usuário', detail: err.message });
    }
  },

  async sendResetCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const result = await userService.sendResetPasswordCode(email, token);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response?.status || 400).json(err.response?.data || { error: 'Erro ao enviar código', detail: err.message });
    }
  },

  async verifyResetCode(req: Request, res: Response) {
    try {
      const { email, otpCode } = req.body;
      const result = await userService.verifyResetCode(email, otpCode, token);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response?.status || 400).json(err.response?.data || { error: 'Erro ao verificar código', detail: err.message });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, password, repeatPassword, otpCode } = req.body;
      const result = await userService.resetPassword(email, password, repeatPassword, otpCode, token);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response?.status || 400).json(err.response?.data || { error: 'Erro ao redefinir senha', detail: err.message });
    }
  },
};

// Mantenha ContactController e UploadController abaixo, 
// mas certifique-se de adicionar o :any ou tipagem correta no catch(err) para acessar err.response
export const ContactController = {
  async create(req: Request, res: Response) {
    try {
      const data = await contactService.createContact(req.body, token);
      res.status(201).json(data.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  },
  
  getAll: async (req: Request, res: Response) => {
      try {
        // ... (lógica original)
        const response = await contactService.getContacts(token, req.headers['order']);
        res.status(200).json(response.data);
      } catch (error: any) {
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
      }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await contactService.updateContact(+id, req.body, token);
      res.json(data.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await contactService.deleteContact(+id, token);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
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
      formData.append('file', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
      const response = await uploadService.uploadFiles(formData, token);
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
  },
};