// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/api/mockAuth'; // Utiliser le service mock

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employer' | 'cleaner' | null;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signInWithGoogle: () => Promise<{ error?: string }>;
  signInWithFacebook: () => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TOKEN: '@domus_token',
  USER: '@domus_user',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger les données d'auth au démarrage
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
      ]);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Vérifier si le token est encore valide
        const isValid = await authService.validateToken(storedToken);
        if (!isValid) {
          await clearAuth();
        }
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const storeAuth = async (newToken: string, newUser: User) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, newToken),
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser)),
      ]);
      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      console.error('Error storing auth:', error);
      throw new Error('Failed to store authentication data');
    }
  };

  const clearAuth = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
      ]);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  };

  const signInWithGoogle = async (): Promise<{ error?: string }> => {
    try {
      setLoading(true);
      const result = await authService.signInWithGoogle();
      
      if (result.error) {
        return { error: result.error };
      }

      if (result.token && result.user) {
        await storeAuth(result.token, result.user);
        return {};
      }

      return { error: 'Authentication failed' };
    } catch (error) {
      console.error('Google sign in error:', error);
      return { error: 'Failed to sign in with Google' };
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async (): Promise<{ error?: string }> => {
    try {
      setLoading(true);
      const result = await authService.signInWithFacebook();
      
      if (result.error) {
        return { error: result.error };
      }

      if (result.token && result.user) {
        await storeAuth(result.token, result.user);
        return {};
      }

      return { error: 'Authentication failed' };
    } catch (error) {
      console.error('Facebook sign in error:', error);
      return { error: 'Failed to sign in with Facebook' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Notifier le backend
      if (token) {
        await authService.signOut(token);
      }
      
      await clearAuth();
    } catch (error) {
      console.error('Sign out error:', error);
      // Clear auth même en cas d'erreur
      await clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<{ error?: string }> => {
    try {
      if (!token || !user) {
        return { error: 'Not authenticated' };
      }

      const result = await authService.updateProfile(token, data);
      
      if (result.error) {
        return { error: result.error };
      }

      if (result.user) {
        const updatedUser = { ...user, ...result.user };
        await storeAuth(token, updatedUser);
        return {};
      }

      return { error: 'Failed to update profile' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: 'Failed to update profile' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signInWithGoogle,
        signInWithFacebook,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}