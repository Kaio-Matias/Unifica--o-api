import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// EMULADOR ANDROID: 10.0.2.2
// EMULADOR IOS / FÍSICO: Use o IP da sua máquina local (ex: 192.168.x.x)
// Não use 'localhost' se estiver no emulador Android.
export const API_URL = 'http://10.0.2.2:3333'; 

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o Token em toda requisição
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta para tratamento básico de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
        console.error(`[API Error] ${error.response.status} - ${error.response.config.url}:`, error.response.data);
    } else {
        console.error(`[API Connection Error]`, error.message);
    }
    return Promise.reject(error);
  }
);