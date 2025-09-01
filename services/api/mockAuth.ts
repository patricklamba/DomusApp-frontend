// services/api/mockAuth.ts
// Service mock pour simuler l'authentification (développement frontend)
import type { User } from '@/contexts/AuthContext';

interface AuthResponse {
  token?: string;
  user?: User;
  error?: string;
}

// Données mockées d'utilisateurs
const mockUsers = {
  google: {
    id: 'google_123',
    email: 'joao@gmail.com',
    name: 'João Silva',
    role: null as 'employer' | 'cleaner' | null,
    avatar: 'https://i.pravatar.cc/150?u=joao',
    isEmailVerified: true,
    isPhoneVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  facebook: {
    id: 'facebook_456',
    email: 'maria@outlook.com', 
    name: 'Maria Santos',
    role: null as 'employer' | 'cleaner' | null,
    avatar: 'https://i.pravatar.cc/150?u=maria',
    isEmailVerified: true,
    isPhoneVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
};

class MockAuthService {
  private currentUser: User | null = null;
  private currentToken: string | null = null;

  // Simuler délai réseau
  private async delay(ms: number = 1500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Générer un faux JWT token
  private generateMockToken(): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: this.currentUser?.id,
      email: this.currentUser?.email,
      role: this.currentUser?.role,
      exp: Date.now() + 86400000 // 24h
    }));
    const signature = btoa('mock_signature');
    return `${header}.${payload}.${signature}`;
  }

  // Simulation Google OAuth
  async signInWithGoogle(): Promise<AuthResponse> {
    console.log('🔵 Mock: Connexion Google simulée...');
    
    await this.delay(2000); // Simuler délai réseau
    
    // Simuler succès dans 90% des cas
    if (Math.random() > 0.1) {
      this.currentUser = { ...mockUsers.google };
      this.currentToken = this.generateMockToken();
      
      console.log('✅ Mock: Connexion Google réussie:', this.currentUser);
      
      return {
        token: this.currentToken,
        user: this.currentUser,
      };
    } else {
      console.log('❌ Mock: Échec connexion Google');
      return { error: 'Échec de connexion Google (simulation)' };
    }
  }

  // Simulation Facebook OAuth
  async signInWithFacebook(): Promise<AuthResponse> {
    console.log('🔷 Mock: Connexion Facebook simulée...');
    
    await this.delay(1800); // Simuler délai réseau
    
    // Simuler succès dans 90% des cas
    if (Math.random() > 0.1) {
      this.currentUser = { ...mockUsers.facebook };
      this.currentToken = this.generateMockToken();
      
      console.log('✅ Mock: Connexion Facebook réussie:', this.currentUser);
      
      return {
        token: this.currentToken,
        user: this.currentUser,
      };
    } else {
      console.log('❌ Mock: Échec connexion Facebook');
      return { error: 'Échec de connexion Facebook (simulation)' };
    }
  }

  // Simulation validation token
  async validateToken(token: string): Promise<boolean> {
    await this.delay(500);
    
    // Token valide s'il contient "mock_signature"
    const isValid = token.includes('mock_signature');
    console.log('🔍 Mock: Validation token:', isValid ? 'Valide' : 'Invalide');
    
    return isValid;
  }

  // Simulation déconnexion
  async signOut(token: string): Promise<void> {
    console.log('👋 Mock: Déconnexion simulée');
    await this.delay(300);
    
    this.currentUser = null;
    this.currentToken = null;
  }

  // Simulation mise à jour profil
  async updateProfile(token: string, data: Partial<User>): Promise<{ user?: User; error?: string }> {
    console.log('📝 Mock: Mise à jour profil:', data);
    
    await this.delay(1000);
    
    if (!this.currentUser) {
      return { error: 'Utilisateur non authentifié' };
    }

    // Simuler succès dans 95% des cas
    if (Math.random() > 0.05) {
      this.currentUser = { ...this.currentUser, ...data };
      console.log('✅ Mock: Profil mis à jour:', this.currentUser);
      
      return { user: this.currentUser };
    } else {
      console.log('❌ Mock: Échec mise à jour profil');
      return { error: 'Échec de la mise à jour (simulation)' };
    }
  }

  // Helper pour obtenir l'utilisateur actuel (debug)
  getCurrentMockUser(): User | null {
    return this.currentUser;
  }

  // Helper pour simuler différents états
  async simulateNetworkError(): Promise<AuthResponse> {
    await this.delay(5000);
    return { error: 'Erreur réseau simulée' };
  }

  async simulateServerError(): Promise<AuthResponse> {
    await this.delay(1000);
    return { error: 'Erreur serveur simulée (500)' };
  }
}

export const mockAuthService = new MockAuthService();

// Export conditionnel : mock en développement, vrai service en production
const isDevelopment = process.env.EXPO_PUBLIC_APP_ENV === 'development';
export const authService = isDevelopment ? mockAuthService : mockAuthService; // Pour l'instant, toujours mock