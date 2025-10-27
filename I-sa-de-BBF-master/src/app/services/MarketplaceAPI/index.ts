import axios from 'axios';
import { getAuthHeaders, API_BASE_URL_MARKETPLACE, getMultipartAuthHeaders } from '../api';
import { objectToQueryParams } from "../../utils/objectToQueryParams";

const createService = (basePath: string) => ({
  getAll: async (token: string, order) => await axios.get(`${API_BASE_URL_MARKETPLACE}${basePath}`, getAuthHeaders(token, order)),
  getById: async (id: string | number, token: string) => await axios.get(`${API_BASE_URL_MARKETPLACE}${basePath}/${id}`, getAuthHeaders(token)),
  getByQuery: async (query: Record<string, any>, token: string, order) => await axios.get(`${API_BASE_URL_MARKETPLACE}${basePath}${objectToQueryParams(query)}`, getAuthHeaders(token, order)),
  getByIdAndQuery: async (query: Record<string, any>, id: number, token: string) => await axios.get(`${API_BASE_URL_MARKETPLACE}${basePath}/${id}${objectToQueryParams(query)}`, getAuthHeaders(token)),
  create: async (data: any, token: string) => await axios.post(`${API_BASE_URL_MARKETPLACE}${basePath}/create`, data, getAuthHeaders(token)),
  update: async (id: string | number, data: any, token: string) => await axios.put(`${API_BASE_URL_MARKETPLACE}${basePath}/${id}`, data, getAuthHeaders(token)),
  remove: async (id: string | number, token: string) => await axios.delete(`${API_BASE_URL_MARKETPLACE}${basePath}/${id}`, getAuthHeaders(token)),
});

export const CarrinhoService = createService('/carrinho');
export const MedicamentoService = createService('/medicamento');
export const PagamentoService = createService('/pagamento');
export const PedidoService = createService('/pedido');
export const PharmacyService = createService('/pharmacy');
export const PharmacyProductService = createService('/product');
export const PromocaoService = createService('/promocao');
export const ReceitaDigitalService = createService('/receita-digital');

export const UploadService = {
  uploadFile: async (formData: any, token: string) =>
    await axios.post(`${API_BASE_URL_MARKETPLACE}/upload-files`, formData, getMultipartAuthHeaders(token)),
};
