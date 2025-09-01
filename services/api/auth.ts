// services/api/auth.ts
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { apiClient } from './client';
import type { User } from '@/contexts/AuthContext';

// Configuration pour les redirects
WebBrowser.maybeCompleteAuthSession();

interface AuthResponse {
  token?: string;
  user?: User;
  error?: string;
}

class AuthService {
  // Google OAuth - Version corrigée sans hooks
  async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const redirectUri = makeRedirectUri({
        scheme: 'domusapp',
        path: '/auth/callback',
      });

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid profile email',
      })}`;

      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectUri,
      });

      if (result.type !== 'success') {
        return { error: 'Google authentication was cancelled or failed' };
      }

      // Extraire le code de la réponse
      const code = result.params?.code;
      if (!code) {
        return { error: 'No authorization code received' };
      }

      // Échanger le code pour un token avec votre backend Spring Boot
      return await this.exchangeGoogleCode(code);

    } catch (error) {
      console.error('Google OAuth error:', error);
      return { error: 'Failed to authenticate with Google' };
    }
  }

  // Facebook OAuth - Version corrigée sans hooks
  async signInWithFacebook(): Promise<AuthResponse> {
    try {
      const redirectUri = makeRedirectUri({
        scheme: 'domusapp',
        path: '/auth/callback',
      });

      const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?${new URLSearchParams({
        client_id: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_ID!,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'public_profile,email',
      })}`;

      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectUri,
      });

      if (result.type !== 'success') {
        return { error: 'Facebook authentication was cancelled or failed' };
      }

      const code = result.params?.code;
      if (!code) {
        return { error: 'No authorization code received' };
      }

      return await this.exchangeFacebookCode(code);

    } catch (error) {
      console.error('Facebook OAuth error:', error);
      return { error: 'Failed to authenticate with Facebook' };
    }
  }

  // Échanger le code Google avec Spring Boot
  private async exchangeGoogleCode(code: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/oauth/google', {
        code,
        redirectUri: makeRedirectUri({
          scheme: 'domusapp',
          path: '/auth/callback',
        }),
      });

      return {
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error: any) {
      console.error('Google code exchange error:', error);
      return { 
        error: error.response?.data?.message || 'Failed to complete Google authentication' 
      };
    }
  }

  // Échanger le code Facebook avec Spring Boot
  private async exchangeFacebookCode(code: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.post('/auth/oauth/facebook', {
        code,
        redirectUri: makeRedirectUri({
          scheme: 'domusapp',
          path: '/auth/callback',
        }),
      });

      return {
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error: any) {
      console.error('Facebook code exchange error:', error);
      return { 
        error: error.response?.data?.message || 'Failed to complete Facebook authentication' 
      };
    }
  }

  // Valider le token
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await apiClient.get('/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  // Déconnexion
  async signOut(token: string): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // Mettre à jour le profil
  async updateProfile(token: string, data: Partial<User>): Promise<{ user?: User; error?: string }> {
    try {
      const response = await apiClient.put('/auth/profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { user: response.data };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { 
        error: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  }
}

export const authService = new AuthService();