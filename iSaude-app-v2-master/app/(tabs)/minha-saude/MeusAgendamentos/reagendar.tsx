import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoricoCard from '../../../../components/historico/HistoricoCard';
import { mockHistoricoData } from '../../../../components/historico/HistoricoData';

export default function ReagendarScreen() {
  const params = useLocalSearchParams();
  const id = (params as any)?.id;

  const professional = mockHistoricoData.find(h => h.id === id);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" onPress={() => router.back()} />
          <Text style={styles.title}>Reagendar Atendimento</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.intro}>Vamos Reagendar esse Atendimento em poucos passos.</Text>
        <Text style={styles.subtitle}>Selecione um dia e um horário para reagendar o atendimento de forma gratuita.</Text>

        {professional && (
          <View style={styles.card}>
            <HistoricoCard item={professional} />
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar" size={20} color="black" />
            <Text style={styles.cardTitle}>1. Selecione uma data</Text>
          </View>
          <Text style={styles.cardText}>Escolha o melhor dia para você entre as opções disponíveis.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-circle" size={20} color="black" />
            <Text style={styles.cardTitle}>2. Finalize seu agendamento</Text>
          </View>
          <Text style={styles.cardText}>Confirme horário e formas de pagamento para concluir o reagendamento.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push(`/(tabs)/minha-saude/MeusAgendamentos/selecionar-horario?id=${id}` as any)}>
          <Text style={styles.confirmButtonText}>Reagendar Atendimento</Text>
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
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  intro: {
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7682',
    fontFamily: 'Intelo',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  cardText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
});
