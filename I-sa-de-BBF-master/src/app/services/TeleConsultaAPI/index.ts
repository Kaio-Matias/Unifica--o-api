import axios from 'axios';
import { getAuthHeaders, API_BASE_URL_TELECONSULTA, getMultipartAuthHeaders } from '../api';
import { objectToQueryParams } from "../../utils/objectToQueryParams";

const createService = (basePath: string) => ({
  getAll: async (token: string, order) => await axios.get(`${API_BASE_URL_TELECONSULTA}${basePath}`, getAuthHeaders(token, order)),
  getById: async (id: string | number, token: string) => await axios.get(`${API_BASE_URL_TELECONSULTA}${basePath}/${id}`, getAuthHeaders(token)),
  getByQuery: async (query: Record<string, any>, token: string, order) => await axios.get(`${API_BASE_URL_TELECONSULTA}${basePath}${objectToQueryParams(query)}`, getAuthHeaders(token, order)),
  getByIdAndQuery: async (query: Record<string, any>, id: number, token: string) => await axios.get(`${API_BASE_URL_TELECONSULTA}${basePath}/${id}${objectToQueryParams(query)}`, getAuthHeaders(token)),
  create: async (data: any, token: string) => await axios.post(`${API_BASE_URL_TELECONSULTA}${basePath}/create`, data, getAuthHeaders(token)),
  update: async (id: string | number, data: any, token: string) => await axios.put(`${API_BASE_URL_TELECONSULTA}${basePath}/${id}`, data, getAuthHeaders(token)),
  remove: async (id: string | number, token: string) => await axios.delete(`${API_BASE_URL_TELECONSULTA}${basePath}/${id}`, getAuthHeaders(token)),
});

export const AgendamentoConsultaService = createService('/agendamento-consulta');
export const AvaliacaoService = createService('/avaliacao');
export const ClinicService = createService('/clinic');
export const ClinicExamService = createService('/exam');
export const ClinicPromocaoService = createService('/promocao');
export const ExamAgendamentoService = createService('/agendamento');
export const ExamPaymentService = createService('/payment');
export const ConexaoProfissionalClinicaService = createService('/conexao-profissional-clinic');
export const DocumentService = createService('/document');
export const EnderecosService = createService('/endereco');

export const UploadService = {
  uploadFile: async (formData: any, token: string) =>
    await axios.post(`${API_BASE_URL_TELECONSULTA}/upload-files`, formData, getMultipartAuthHeaders(token)),
};
