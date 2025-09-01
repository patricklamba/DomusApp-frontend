// app/auth/login.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { TextStyles } from '@/constants/Typography';

export default function LoginScreen() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  
  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        Alert.alert('Erro', error);
      } else {
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação com Google');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoadingFacebook(true);
    
    try {
      const { error } = await signInWithFacebook();
      
      if (error) {
        Alert.alert('Erro', error);
      } else {
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação com Facebook');
    } finally {
      setLoadingFacebook(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🔐</Text>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta ao DomusApp</Text>
        </View>
        
        {/* Social Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Continuar com Google"
            onPress={handleGoogleLogin}
            variant="primary"
            loading={loadingGoogle}
            disabled={loadingGoogle || loadingFacebook}
            emoji="🔵"
          />
          
          <Button
            title="Continuar com Facebook"
            onPress={handleFacebookLogin}
            variant="secondary"
            loading={loadingFacebook}
            disabled={loadingGoogle || loadingFacebook}
            emoji="🔷"
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email Option */}
        <View style={styles.emailSection}>
          <Text style={styles.emailText}>Prefere usar email?</Text>
          <Button
            title="Entrar com Email"
            onPress={() => Alert.alert('Info', 'Em breve!')}
            variant="outline"
          />
        </View>
        
        {/* Bottom Links */}
        <View style={styles.bottomSection}>
          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Não tem uma conta? </Text>
            <Link href="/" asChild>
              <Text style={styles.link}>Criar Conta</Text>
            </Link>
          </View>

          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Problemas para entrar? </Text>
            <Text style={styles.link}>Central de Ajuda</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1E1E1',
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.text.secondary,
    fontSize: 14,
  },
  emailSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emailText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    gap: 16,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  link: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});