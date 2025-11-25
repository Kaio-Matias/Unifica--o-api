import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SalaAtendimentoScreen() {
  const handleExitRoom = () => {
    // Navegar para a tela de atendimento concluído
    router.push('/minha-saude/atendimentos/atendimento-concluido');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleExitRoom}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Sala de Atendimento</Text>
      </View>
      <View style={styles.roomContainer}>
        <Text style={styles.placeholderText}>Você entrou na sala de atendimento.</Text>
        <Text style={styles.infoText}>Aqui seria o espaço para a consulta (mockado).</Text>
        <Text style={styles.infoText}>Funcionalidades reais de vídeo/chamada seriam implementadas aqui.</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExitRoom}>
          <Text style={styles.exitButtonText}>Sair da Sala</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  roomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    fontSize: 18,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo',
    textAlign: 'center',
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5EAF0',
  },
  exitButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
});