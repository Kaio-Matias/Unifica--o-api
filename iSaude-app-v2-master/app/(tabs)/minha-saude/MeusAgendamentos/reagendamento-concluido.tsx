import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockAgendamentos } from './index';

export default function ReagendamentoConcluido() {
  const params = useLocalSearchParams();
  const { id, date, time } = params;

  // Busca o agendamento pelo ID
  const appointment = mockAgendamentos.find(a => a.id === id);

  const copyToClipboard = (code: string) => {
    // Simulação de cópia
    console.log('Código copiado:', code);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" onPress={() => router.push('/(tabs)/minha-saude')} />
          <Text style={styles.title}>Reagendamento Concluído</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Ícone de sucesso */}
        <View style={styles.successIcon}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={40} color="#FFFFFF" />
          </View>
        </View>

        {/* Mensagem de sucesso */}
        <Text style={styles.successTitle}>O Atendimento foi reagendado com Sucesso.</Text>
        <Text style={styles.successSubtitle}>
          {appointment?.name ? `A ${appointment.name} já foi informada do seu agendamento.` : 'O profissional já foi informado do seu agendamento.'}
        </Text>

        {/* Card do profissional - usando dados reais */}
        {appointment && (
          <View style={styles.doctorCard}>
            <Image
              source={{ uri: appointment.avatar }}
              style={styles.doctorAvatar}
            />
            <View style={styles.doctorInfo}>
              <View style={styles.doctorNameContainer}>
                <Text style={styles.doctorName}>{appointment.name}</Text>
                <Ionicons name="checkmark-circle" size={16} color="#4576F2" />
              </View>
              <Text style={styles.doctorSpecialty}>{appointment.type} - {appointment.description}</Text>
            </View>
          </View>
        )}

        {/* Card da consulta */}
        <View style={styles.appointmentCard}>
          <Text style={styles.cardTitle}>{appointment?.type || 'Consulta Geral'}</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color="#6B7682" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Data do Atendimento</Text>
              <Text style={styles.infoValue}>Segunda, {date} às {time}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="alarm-outline" size={20} color="#6B7682" />
            <View style={styles.infoContent}>
              <Text style={styles.infoValue}>Lembrar 15 minutos antes</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.codeSection}>
            <Text style={styles.codeLabel}>Código da Sala</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeValue}>4592-962025</Text>
              <TouchableOpacity>
                <Ionicons name="copy-outline" size={20} color="#4576F2" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.availabilityNote}>
            A sala estará disponível 10 minutos antes do início do atendimento.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => router.push('/(tabs)/minha-saude')}
        >
          <Text style={styles.confirmButtonText}>Voltar para o Início</Text>
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
    paddingBottom: 100,
    alignItems: 'center',
  },
  successIcon: {
    marginTop: 20,
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7682',
    fontFamily: 'Intelo',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6B7682',
    fontFamily: 'Intelo',
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7682',
    fontFamily: 'Intelo',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 16,
  },
  codeSection: {
    marginBottom: 12,
  },
  codeLabel: {
    fontSize: 12,
    color: '#6B7682',
    fontFamily: 'Intelo',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
  },
  codeValue: {
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    fontWeight: '600',
  },
  availabilityNote: {
    fontSize: 12,
    color: '#6B7682',
    fontFamily: 'Intelo',
    lineHeight: 16,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5EAF0',
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
