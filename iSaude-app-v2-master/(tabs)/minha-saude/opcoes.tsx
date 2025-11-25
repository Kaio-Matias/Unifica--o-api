import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OpcoesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Opções</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/minha-saude/historico/historico' as any)}>
          <Text style={styles.menuButtonText}>Histórico de Atendimento</Text>
          <Ionicons name="chevron-forward" size={24} color="#4576F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/minha-saude/prescricoes/prescricoes' as any)}>
          <Text style={styles.menuButtonText}>Prescrições e Atestados</Text>
          <Ionicons name="chevron-forward" size={24} color="#4576F2" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
});