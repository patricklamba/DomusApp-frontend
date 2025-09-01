// app/index.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

export default function WelcomeScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      if (user.role === 'employer') {
        router.replace('/');  // Temporaire - remplacera par dashboard
      } else if (user.role === 'cleaner') {
        router.replace('/');  // Temporaire - remplacera par dashboard
      } else {
        // User needs to complete profile (select role)
        router.replace('/auth/complete-profile');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingEmoji}>🏠</Text>
        <Text style={styles.loadingTitle}>DomusApp</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Show welcome screen if not authenticated
  if (!user) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ImageBackground
          source={{ 
            uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' 
          }}
          style={styles.backgroundImage}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.overlay}>
              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Text style={styles.emoji}>🏠</Text>
                  <Text style={styles.title}>Domus</Text>
                  <Text style={styles.subtitle}>
                    Conectando você aos melhores profissionais de limpeza em Angola
                  </Text>
                </View>
                
                <View style={styles.buttonContainer}>
                  <Button
                    title="Continue with Google"
                    onPress={() => router.push('/auth/login')}
                    variant="primary"
                    emoji="🔵"
                  />
                  
                  <Button
                    title="Continue with Facebook"
                    onPress={() => router.push('/auth/login')}
                    variant="secondary"
                    emoji="🔷"
                  />

                  <Button
                    title="Create Account"
                    onPress={() => router.push('/')}
                    variant="outline"
                    style={styles.outlineButton}
                    textStyle={styles.outlineButtonText}
                  />
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Limpeza profissional • Confiança • Angola
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 18,
    color: '#666666',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  outlineButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  outlineButtonText: {
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});