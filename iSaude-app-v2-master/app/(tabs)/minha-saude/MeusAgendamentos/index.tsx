import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const mockAgendamentos = [
  {
    id: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=ClinicaMaisSaude&backgroundColor=4576F2&size=100',
    name: 'Clínica Mais Saúde',
    date: 'Quinta, 1 de Maio',
    time: '9:30',
    type: 'Exames',
    description: 'Raio-X e Hemograma',
    codigoAtendimento: 'ATD001',
    duracao: '45 min',
    comentarioProfissional: 'Exames realizados com sucesso. Paciente apresentou resultados dentro dos parâmetros normais.',
    comentarioAdicional: 'Recomendado acompanhamento trimestral.',
    documentosDisponiveis: 2,
    valorAtendimento: 150.00,
    metodoPagamento: 'pix',
    parcelado: false,
  },
  {
    id: '2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=LabCentral&backgroundColor=01AEA4&size=100',
    name: 'Laboratório Central',
    date: 'Sexta, 2 de Maio',
    time: '10:00',
    type: 'Exames',
    description: 'Exame de Sangue',
    codigoAtendimento: 'ATD002',
    duracao: '30 min',
    comentarioProfissional: 'Coleta de sangue realizada sem intercorrências.',
    comentarioAdicional: '',
    documentosDisponiveis: 1,
    valorAtendimento: 80.00,
    metodoPagamento: 'dinheiro',
    parcelado: false,
  },
  {
    id: '3',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=DraMaria&backgroundColor=7F5CE1&size=100',
    name: 'Dra. Maria Santos',
    date: 'Segunda, 5 de Maio',
    time: '14:30',
    type: 'Consulta',
    description: 'Dermatologia',
    codigoAtendimento: 'ATD003',
    duracao: '60 min',
    comentarioProfissional: 'Consulta de rotina. Paciente apresenta melhora significativa no quadro dermatológico.',
    comentarioAdicional: 'Prescrição de medicamentos renovada.',
    documentosDisponiveis: 3,
    valorAtendimento: 200.00,
    metodoPagamento: 'cartao_credito',
    numeroCartao: '1234',
    parcelado: true,
    numeroParcelas: 3,
    valorParcela: 66.67,
  },
  {
    id: '4',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=ClinicaVida&backgroundColor=FF7A7A&size=100',
    name: 'Clínica Vida',
    date: 'Terça, 6 de Maio',
    time: '09:15',
    type: 'Exames',
    description: 'Raio-X',
    codigoAtendimento: 'ATD004',
    duracao: '20 min',
    comentarioProfissional: 'Exame radiológico realizado conforme solicitado.',
    comentarioAdicional: '',
    documentosDisponiveis: 1,
    valorAtendimento: 120.00,
    metodoPagamento: 'pix',
    parcelado: false,
  },
  {
    id: '5',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=DrJoao&backgroundColor=4576F2&size=100',
    name: 'Dr. João Silva',
    date: 'Quarta, 7 de Maio',
    time: '11:00',
    type: 'Consulta',
    description: 'Cardiologia',
    codigoAtendimento: 'ATD005',
    duracao: '45 min',
    comentarioProfissional: 'Avaliação cardiológica de rotina. Paciente estável.',
    comentarioAdicional: 'Ajuste na medicação realizado.',
    documentosDisponiveis: 2,
    valorAtendimento: 250.00,
    metodoPagamento: 'cartao_credito',
    numeroCartao: '5678',
    parcelado: true,
    numeroParcelas: 2,
    valorParcela: 125.00,
  },
];

const renderHeader = () => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={24} color="#1E2532" />
    </TouchableOpacity>
    <Text style={styles.title}>Atendimento Agendado</Text>
  </View>
);

export default function AgendamentosScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {mockAgendamentos.map((agendamento) => (
          <TouchableOpacity
            key={agendamento.id}
            style={styles.appointmentCard}
            onPress={() => router.push(`/minha-saude/agendamentos/${agendamento.id}` as any)}
          >
            <View style={styles.topSection}>
              <View style={styles.leftColumn}>
                <Image source={{ uri: agendamento.avatar }} style={styles.avatar} />
                <Text style={styles.appointmentTitle}>{agendamento.name}</Text>
              </View>
              <View style={styles.rightColumn}>
                <Text style={styles.date}>{agendamento.date}</Text>
                <Text style={styles.time}>{agendamento.time}</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.bottomSection}>
              <Text style={styles.type}>{agendamento.type}</Text>
              <Text style={styles.description}>{agendamento.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  headerContent: {
    flex: 1,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4576F2',
    fontFamily: 'Intelo-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8, // Changed to rounded corners for a rectangular shape
    marginRight: 12,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  date: {
    fontSize: 12, // Reduced font size for the date
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  time: {
    fontSize: 18, // Reduced font size for the time to match the date
    color: 'black',
    fontFamily: 'Intelo-Bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 8,
  },
  bottomSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  type: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo',
  },
  description: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Intelo-Bold',
  },
});