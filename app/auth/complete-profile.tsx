// app/auth/complete-profile.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { TextStyles } from '@/constants/Typography';

export default function CompleteProfileScreen() {
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'employer' | 'cleaner' | null>(null);
  const [loading, setLoading] = useState(false);
  const { updateProfile, user } = useAuth();
  
  const handleCompleteProfile = async () => {
    if (!phone || phone.length < 9) {
      Alert.alert('Erro', 'Por favor, insira um número de telefone válido');
      return;
    }
    
    if (!role) {
      Alert.alert('Erro', 'Por favor, selecione o seu tipo de perfil');
      return;
    }
    
    setLoading(true);
    
    // Format phone number for Angola (+244)
    const formattedPhone = phone.startsWith('+244') 
      ? phone 
      : `+244${phone}`;
    
    const { error } = await updateProfile({
      phone: formattedPhone,
      role: role,
    });
    
    if (error) {
      Alert.alert('Error', error);
      setLoading(false);
    } else {
      // Navigate based on role
      if (role === 'employer') {
        router.replace('/');
      } else {
        router.replace('/');
      }
    }
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" />
        
        <View style={styles.header}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Complete seu Perfil</Text>
          <Text style={styles.subtitle}>
            Olá {user?.name?.split(' ')[0]}! Vamos finalizar sua conta
          </Text>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Número de Telefone"
            placeholder="912345678"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={9}
            leftElement={
              <Text style={styles.countryCode}>+244</Text>
            }
          />
          
          <Text style={styles.roleLabel}>Eu sou:</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                role === 'employer' ? styles.roleButtonSelected : null
              ]}
              onPress={() => setRole('employer')}
            >
              <Text style={styles.roleEmoji}>🏠</Text>
              <Text style={styles.roleText}>Cliente</Text>
              <Text style={styles.roleDescription}>
                Preciso de serviços de limpeza
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.roleButton, 
                role === 'cleaner' ? styles.roleButtonSelected : null
              ]}
              onPress={() => setRole('cleaner')}
            >
              <Text style={styles.roleEmoji}>🧹</Text>
              <Text style={styles.roleText}>Profissional</Text>
              <Text style={styles.roleDescription}>
                Ofereço serviços de limpeza
              </Text>
            </TouchableOpacity>
          </View>
          
          <Button
            title="Finalizar Perfil"
            onPress={handleCompleteProfile}
            variant="primary"
            loading={loading}
            disabled={!phone || !role || loading}
            style={styles.button}
          />

          <View style={styles.privacyContainer}>
            <Text style={styles.privacyText}>
              Ao continuar, você concorda com nossos{' '}
              <Text style={styles.privacyLink}>Termos de Uso</Text>
              {' '}e{' '}
              <Text style={styles.privacyLink}>Política de Privacidade</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: Sizes.header.paddingTop,
    paddingHorizontal: Sizes.screen.paddingHorizontal,
    paddingBottom: Sizes.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Sizes.spacing.xxxl,
  },
  emoji: {
    fontSize: Sizes.emoji.large,
    marginBottom: Sizes.spacing.md,
  },
  title: {
    ...TextStyles.screenTitle,
    color: Colors.text.primary,
    marginBottom: Sizes.spacing.sm,
  },
  subtitle: {
    ...TextStyles.screenSubtitle,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    width: '100%',
  },
  countryCode: {
    fontSize: TextStyles.input.fontSize,
    fontWeight: '600',
    color: Colors.text.primary,
    marginRight: Sizes.spacing.sm,
  },
  roleLabel: {
    ...TextStyles.label,
    color: Colors.text.primary,
    marginBottom: Sizes.spacing.md,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizes.spacing.xl,
    gap: Sizes.spacing.md,
  },
  roleButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Sizes.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.spacing.lg,
    minHeight: 140,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleButtonSelected: {
    backgroundColor: Colors.border.focus,
    borderColor: Colors.border.selected,
  },
  roleEmoji: {
    fontSize: Sizes.emoji.medium,
    marginBottom: Sizes.spacing.sm,
  },
  roleText: {
    ...TextStyles.roleTitle,
    color: Colors.text.primary,
    marginBottom: Sizes.spacing.xs,
  },
  roleDescription: {
    ...TextStyles.roleDescription,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  button: {
    marginTop: Sizes.spacing.lg,
  },
  privacyContainer: {
    marginTop: Sizes.spacing.xl,
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  privacyLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});