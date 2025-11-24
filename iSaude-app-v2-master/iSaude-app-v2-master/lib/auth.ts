import api from './api';
import * as SecureStore from 'expo-secure-store';

// Tipos para os dados de usuário e tokens
interface User {
  id: number;
  nome: string;
  email: string;
  user_type: 'pacient' | 'professional' | 'clinic';
  // Adicione outros campos conforme necessário
}

interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Realiza o login do usuário.
 * @param email - O email do usuário.
 * @param password - A senha do usuário.
 * @returns Os dados do usuário e o token.
 */
export const login = async (email, password) => {
  try {
    const response = await api.post<AuthResponse>('/user/login', {
      email,
      password,
    });

    const { user, token } = response.data;

    // Armazena o token de forma segura
    await SecureStore.setItemAsync('userToken', token);

    // Adiciona o token aos headers padrão do Axios para futuras requisições
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { user, token };
  } catch (error) {
    console.error('Falha no login:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Realiza o logout do usuário.
 */
export const logout = async () => {
  try {
    // Remove o token do armazenamento seguro
    await SecureStore.deleteItemAsync('userToken');

    // Remove o token dos headers padrão do Axios
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Falha no logout:', error);
    throw error;
  }
};


/**
 * Cria um novo usuário.
 * @param userData - Os dados do novo usuário.
 * @returns Os dados do usuário criado.
 */
export const createUser = async (userData) => {
    try {
        const response = await api.post<User>('/user/create', userData);
        return response.data;
    } catch (error) {
        console.error('Falha ao criar usuário:', error.response?.data || error.message);
        throw error;
    }
};
