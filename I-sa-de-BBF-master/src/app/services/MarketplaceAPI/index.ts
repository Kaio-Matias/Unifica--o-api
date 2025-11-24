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

export const CarrinhoService = createService('/api/carrinho');
export const MedicamentoService = createService('/api/medicamento');
export const PagamentoService = createService('/api/pagamento');
export const PedidoService = createService('/api/pedido');
export const PharmacyService = createService('/api/pharmacy');
export const PharmacyProductService = createService('/api/product');
export const PromocaoService = createService('/api/promocao');
export const ReceitaDigitalService = createService('/api/receita-digital');

export const UploadService = {
  uploadFile: async (formData: any, token: string) =>
    await axios.post(`${API_BASE_URL_MARKETPLACE}/api/upload-files`, formData, getMultipartAuthHeaders(token)),
};
