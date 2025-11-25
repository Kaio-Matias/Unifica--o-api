import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://localhost:8080'; // URL base para o BFF

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
