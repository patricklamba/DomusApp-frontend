// services/api/client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
const API_VERSION = process.env.EXPO_PUBLIC_API_VERSION || 'v1';

// Configuration d'Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur de requête pour ajouter le token JWT
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    try {
      const token = await AsyncStorage.getItem('@domus_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    
    // Log des requêtes en développement
    if (__DEV__) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📤 Request data:', config.data);
      }
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log des réponses en développement
    if (__DEV__) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
      console.log('📥 Response data:', response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    // Log des erreurs
    if (__DEV__) {
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
      console.error('📥 Error response:', error.response?.data);
    }

    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      try {
        await AsyncStorage.multiRemove(['@domus_token', '@domus_user']);
        // Rediriger vers la page de connexion
        // Note: La redirection sera gérée par le AuthContext
      } catch (storageError) {
        console.error('Error clearing auth storage:', storageError);
      }
    }

    // Gestion des erreurs réseau
    if (!error.response) {
      return Promise.reject({
        ...error,
        message: 'Network error. Please check your connection.',
      });
    }

    return Promise.reject(error);
  }
);

// Helper pour les requêtes avec gestion d'erreur standardisée
export const apiRequest = async <T = any>(
  requestFn: () => Promise<AxiosResponse<T>>
): Promise<{ data?: T; error?: string }> => {
  try {
    const response = await requestFn();
    return { data: response.data };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    return { error: errorMessage };
  }
};

export { apiClient };