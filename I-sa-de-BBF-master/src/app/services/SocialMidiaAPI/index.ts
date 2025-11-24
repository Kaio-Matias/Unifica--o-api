import axios from 'axios';
import { getAuthHeaders, getMultipartAuthHeaders, API_BASE_URL_SOCIAL_MIDIA as API } from '../api';
import { objectToQueryParams } from "../../utils/objectToQueryParams";

const createService = (basePath) => ({
  getAll: async (token, order) => await axios.get(`${API}/${basePath}`, getAuthHeaders(token, order)),
  getById: async (id, token) => await axios.get(`${API}/${basePath}/${id}`, getAuthHeaders(token)),
  getByQuery: async (query: Record<string, any>, token: string, order) => await axios.get(`${API}${basePath}${objectToQueryParams(query)}`, getAuthHeaders(token, order)),
  getByIdAndQuery: async (query: Record<string, any>, id: number, token: string) => await axios.get(`${API}${basePath}/${id}${objectToQueryParams(query)}`, getAuthHeaders(token)),
  create: async (data, token) => await axios.post(`${API}/${basePath}/create`, data, getAuthHeaders(token)),
  update: async (id, data, token) => await axios.put(`${API}/${basePath}/${id}`, data, getAuthHeaders(token)),
  remove: async (id, token) => await axios.delete(`${API}/${basePath}/${id}`, getAuthHeaders(token)),
});

export const AulaService = createService('api/aulas');
export const CategoriaPostagemService = createService('api/categoria-postagens');
export const CertificadoService = createService('api/certificados');
export const ComentarioService = createService('api/comentarios');
export const CurtidaService = createService('api/curtidas');
export const EnderecoService = createService('api/enderecos');
export const FarmaciaService = createService('api/pharmacy');
export const InscricaoTrilhaService = createService('api/inscricao-trilhas');
export const LocalizacaoService = createService('api/localizacao');
export const ModuloTrilhaService = createService('api/modulo-trilha');
export const NotificacaoService = createService('api/notificacoes');
export const PostagemService = createService('api/postagens');
export const ProfissionalDetalhesService = createService('api/profissional-detalhes');
export const ProgressoAulaService = createService('api/progresso-aula');
export const QuestaoQuizService = createService('api/questao-quiz');
export const QuizService = createService('api/quiz');
export const RespostaUsuarioService = createService('api/resposta-usuario');
export const SalvamentoService = createService('api/salvamentos');
export const SeguidorService = createService('api/seguidores');
export const TrilhaService = createService('api/trilha');
export const UnidadeSaudeService = createService('api/unidades-saude');
export const StoryService = createService('api/story');

export const UploadService = {
  uploadFile: async (formData, token) => await axios.post(`${API}/api/upload-files`, formData, getMultipartAuthHeaders(token)),
};
