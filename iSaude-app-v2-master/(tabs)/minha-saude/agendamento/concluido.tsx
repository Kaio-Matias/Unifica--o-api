import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AgendamentoConcluido() {
  // Mock data - em produção viria dos params da navegação
  const appointmentData = {
    professional: {
      name: 'Dra. Maria Glenda',
      clinic: 'Clínico Geral',
      verified: true,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    service: 'Consulta Geral',
    date: 'Segunda, 28 de Abril',
    time: '8:30',
    reminder: true,
    roomCode: '4S59-BE202SC',
    price: 50.90,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </Pressable>
        <Text style={styles.headerTitle}>Agendamento Concluído</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Success Icon */}
        <View style={styles.successSection}>
          <View style={styles.successBadge}>
            <Ionicons name="checkmark" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.successTitle}>Seu atendimento foi agendado com sucesso.</Text>
          <Text style={styles.successSubtitle}>
            O Pagamento foi confirmado e a Dra. {appointmentData.professional.name} já foi informada do seu agendamento.
          </Text>
        </View>

        {/* Professional Card */}
        <View style={styles.card}>
          <View style={styles.professionalInfo}>
            <Image
              source={{ uri: appointmentData.professional.avatar }}
              style={styles.avatar}
            />
            <View style={styles.professionalText}>
              <View style={styles.nameRow}>
                <Text style={styles.professionalName}>{appointmentData.professional.name}</Text>
                {appointmentData.professional.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#01AEA4" />
                )}
              </View>
              <View style={styles.clinicRow}>
                <Ionicons name="medkit-outline" size={14} color="#666666" />
                <Text style={styles.clinicName}>{appointmentData.professional.clinic}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.card}>
          <Text style={styles.serviceTitle}>{appointmentData.service}</Text>
        </View>

        {/* Date and Time */}
        <View style={styles.card}>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={20} color="#666666" />
            <View>
              <Text style={styles.dateLabel}>Data do Atendimento</Text>
              <Text style={styles.dateValue}>
                {appointmentData.date} às {appointmentData.time}
              </Text>
            </View>
          </View>

          {appointmentData.reminder && (
            <View style={styles.reminderRow}>
              <Ionicons name="checkmark-circle" size={20} color="#4576F2" />
              <Text style={styles.reminderText}>Lembrar 15 minutos antes</Text>
            </View>
          )}
        </View>

        {/* Room Code */}
        <View style={styles.card}>
          <Text style={styles.roomLabel}>Código da Sala</Text>
          <View style={styles.roomCodeRow}>
            <Text style={styles.roomCode}>{appointmentData.roomCode}</Text>
            <Pressable style={styles.copyButton}>
              <Ionicons name="copy-outline" size={20} color="#666666" />
            </Pressable>
          </View>
          <Text style={styles.roomInfo}>
            A sala estará disponível 10 minutos antes do início do atendimento.
          </Text>
        </View>

        {/* Payment Value */}
        <View style={styles.card}>
          <Text style={styles.priceLabel}>Valor do Atendimento</Text>
          <Text style={styles.priceValue}>
            R$ {appointmentData.price.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        {/* Credit Card Info - Placeholder */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Cartão de Crédito</Text>
          <View style={styles.cardRow}>
            <Ionicons name="card" size={24} color="#666666" />
            <Text style={styles.cardNumber}>•••• •••• •••• 4242</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <Pressable
          style={styles.backHomeButton}
          onPress={() => router.push('/(tabs)/minha-saude')}
        >
          <Text style={styles.backHomeButtonText}>Voltar para o início</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  scrollView: {
    flex: 1,
  },
  successSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  successBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#01AEA4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Intelo',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Intelo',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  professionalText: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clinicName: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Intelo',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
    fontFamily: 'Intelo',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reminderText: {
    fontSize: 14,
    color: '#4576F2',
    fontFamily: 'Intelo',
  },
  roomLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
    fontFamily: 'Intelo',
  },
  roomCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  roomCode: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4576F2',
    fontFamily: 'Intelo',
  },
  copyButton: {
    padding: 8,
  },
  roomInfo: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Intelo',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
    fontFamily: 'Intelo',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Intelo',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardNumber: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Intelo',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  backHomeButton: {
    backgroundColor: '#4576F2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backHomeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo',
  },
});
