import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// IMPORTS DE DESIGN
import { Button } from '../../components/ui/Button';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { useRegister } from '../../lib/context/RegisterContext'; // Importa a lógica

export default function ConfirmRegisterPacient() {
  const router = useRouter();
  const { submitRegistration, loading, data } = useRegister();

  const handleConfirm = async () => {
    try {
      // Chama a função do contexto que bate na API
      await submitRegistration();
      
      // Se deu certo, mostra alerta e vai para sucesso
      // O Backend BFF cria User + Paciente em uma tacada só
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      
      // Navega para a tela de "Cadastro Confirmado" (visual)
      // Verifique se a rota '/(tabs)/home' é onde você quer jogar o user, 
      // ou se tem uma tela intermediária de sucesso.
      router.replace('/login'); 
      
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Não foi possível concluir o cadastro.';
      Alert.alert('Erro', msg);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* IMAGEM DE CONFIRMAÇÃO (MANTIDA) */}
        <Image 
          source={require('../../assets/images/Confirm-Register-Pacient.png')} 
          style={styles.image}
          resizeMode="contain"
        />

        <ThemedText type="title" style={styles.title}>Tudo Pronto!</ThemedText>
        
        <ThemedText style={styles.text}>
          Olá, <ThemedText type="defaultSemiBold">{data.personalInfo.nome}</ThemedText>.
          {'\n'}Confirme seus dados para finalizar o cadastro no iSaúde.
        </ThemedText>

        <View style={styles.buttonContainer}>
          <Button onPress={handleConfirm} disabled={loading} style={styles.button}>
            {loading ? (
              <ThemedText style={styles.buttonText}>Processando...</ThemedText>
            ) : (
              <ThemedText style={styles.buttonText}>Confirmar Cadastro</ThemedText>
            )}
          </Button>

          <Button variant="outline" onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>Voltar e Revisar</ThemedText>
          </Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  backButton: {
    paddingVertical: 12,
    borderColor: '#ccc',
  },
  backButtonText: {
    textAlign: 'center',
    fontSize: 16,
  }
});