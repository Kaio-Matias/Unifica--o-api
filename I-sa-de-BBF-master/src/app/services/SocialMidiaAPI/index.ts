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

export const AulaService = createService('aulas');
export const CategoriaPostagemService = createService('categoria-postagens');
export const CertificadoService = createService('certificados');
export const ComentarioService = createService('comentarios');
export const CurtidaService = createService('curtidas');
export const EnderecoService = createService('enderecos');
export const FarmaciaService = createService('pharmacy');
export const InscricaoTrilhaService = createService('inscricao-trilhas');
export const LocalizacaoService = createService('localizacao');
export const ModuloTrilhaService = createService('modulo-trilha');
export const NotificacaoService = createService('notificacoes');
export const PostagemService = createService('postagens');
export const ProfissionalDetalhesService = createService('profissional-detalhes');
export const ProgressoAulaService = createService('progresso-aula');
export const QuestaoQuizService = createService('questao-quiz');
export const QuizService = createService('quiz');
export const RespostaUsuarioService = createService('resposta-usuario');
export const SalvamentoService = createService('salvamentos');
export const SeguidorService = createService('seguidores');
export const TrilhaService = createService('trilha');
export const UnidadeSaudeService = createService('unidades-saude');
export const StoryService = createService('story');

export const UploadService = {
  uploadFile: async (formData, token) => await axios.post(`${API}/api/upload-files`, formData, getMultipartAuthHeaders(token)),
};
