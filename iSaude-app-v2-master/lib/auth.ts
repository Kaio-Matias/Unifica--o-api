import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { api } from './api';

export const USER_STORAGE_KEY = 'isaude_user';
export const TOKEN_STORAGE_KEY = 'auth_token';

export async function saveAuthData(token: string, user: any) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    
    // Atualiza o header padrão para requisições futuras imediatas
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Erro ao salvar dados de auth:', error);
  }
}

export async function getAuthData() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    const user = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  } catch (error) {
    return { token: null, user: null };
  }
}

export async function logout() {
  try {
    await AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);
    delete api.defaults.headers.common['Authorization'];
    router.replace('/login');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
}