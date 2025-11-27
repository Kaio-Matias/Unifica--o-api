import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// IMPORTS DOS SEUS COMPONENTES DE DESIGN (MANTIDOS)
import { Input } from '../components/ui/Input'; // Seu input customizado
import { Button } from '../components/ui/Button'; // Seu botão customizado
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { Colors } from '@/constants/Colors';

// LÓGICA DE INTEGRAÇÃO
import { api } from '../lib/api';
import { saveAuthData } from '../lib/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      // Chamada real à API (Porta 3333 BFF)
      const response = await api.post('/login', {
        email,
        password
      });

      const { token, user } = response.data;

      if (token) {
        await saveAuthData(token, user || {});
        // Redireciona para a Home Logada
        router.replace('/(tabs)/home'); 
      } else {
        throw new Error('Falha ao receber credenciais.');
      }

    } catch (error: any) {
      console.error('Login Error:', error);
      const message = error.response?.data?.message || error.response?.data?.error || 'E-mail ou senha incorretos.';
      Alert.alert('Erro no Login', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* LOGO E CABEÇALHO (MANTENDO DESIGN) */}
          <View style={styles.headerContainer}>
            <Image 
              source={require('../assets/images/logo-isaude.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
            <ThemedText type="title" style={styles.title}>Bem-vindo de volta!</ThemedText>
            <ThemedText style={styles.subtitle}>Faça login para acessar sua saúde.</ThemedText>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.formContainer}>
            <Input
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              label="E-mail"
            />

            <Input
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              label="Senha"
            />

            <TouchableOpacity onPress={() => router.push('/ForgotPasswordScreen')} style={styles.forgotPassword}>
              <ThemedText style={styles.forgotPasswordText}>Esqueceu sua senha?</ThemedText>
            </TouchableOpacity>

            <Button onPress={handleLogin} disabled={loading} style={styles.loginButton}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <ThemedText style={styles.loginButtonText}>Entrar</ThemedText>
              )}
            </Button>
          </View>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <ThemedText>Ainda não tem uma conta? </ThemedText>
            <TouchableOpacity onPress={() => router.push('/ConnectTypeScreen')}>
              <ThemedText type="link" style={styles.linkText}>Cadastre-se</ThemedText>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

// ESTILOS ORIGINAIS (PRESERVADOS/SIMULADOS COM BASE NO PADRÃO)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  formContainer: {
    gap: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.light.tint, // Usando a cor do tema
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 12,
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  linkText: {
    fontWeight: 'bold',
    color: Colors.light.tint,
  }
});