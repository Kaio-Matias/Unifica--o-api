import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Dados mock de exames (mesmos da listagem)
interface Exame {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
  imagem: string;
  validade: string;
  atendimentoTitulo?: string;
  profissional?: string;
  resultados: { parametro: string; valor: string; status: string }[];
}

const mockExames: Exame[] = [
  {
    id: '1',
    titulo: 'Exame de Sangue',
    data: '10/10/2024',
    tipo: 'Laboratorial',
    imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Sangue',
    validade: '10/11/2024',
    atendimentoTitulo: 'Consulta de Rotina',
    profissional: 'Dr. João Silva',
    resultados: [
      { parametro: 'Hemoglobina', valor: '14.5 g/dL', status: 'Normal' },
      { parametro: 'Glicose', valor: '90 mg/dL', status: 'Normal' },
      { parametro: 'Colesterol Total', valor: '180 mg/dL', status: 'Normal' },
    ],
  },
  {
    id: '2',
    titulo: 'Raio-X do Tórax',
    data: '05/09/2024',
    tipo: 'Imagem',
    imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Raio+X',
    validade: '05/12/2024',
    atendimentoTitulo: 'Exames de Imagem',
    profissional: 'Dra. Maria Santos',
    resultados: [
      { parametro: 'Resultado', valor: 'Normal', status: 'Normal' },
      { parametro: 'Observações', valor: 'Estrutura pulmonar preservada', status: 'Normal' },
    ],
  },
  {
    id: '3',
    titulo: 'Hemograma Completo',
    data: '15/08/2024',
    tipo: 'Laboratorial',
    imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Hemograma',
    validade: '15/11/2024',
    atendimentoTitulo: 'Acompanhamento Clínico',
    profissional: 'Dra. Carla Lima',
    resultados: [
      { parametro: 'Leucócitos', valor: '7.500 /mm³', status: 'Normal' },
      { parametro: 'Hemácias', valor: '4.8 milhões/mm³', status: 'Normal' },
      { parametro: 'Plaquetas', valor: '250.000 /mm³', status: 'Normal' },
    ],
  },
  {
    id: '4',
    titulo: 'Eletrocardiograma',
    data: '20/07/2024',
    tipo: 'Cardiológico',
    imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=ECG',
    validade: '20/10/2024',
    atendimentoTitulo: 'Consulta Cardiológica',
    profissional: 'Dr. Carlos Mendes',
    resultados: [
      { parametro: 'Ritmo', valor: 'Sinusal', status: 'Normal' },
      { parametro: 'Frequência', valor: '72 bpm', status: 'Normal' },
    ],
  },
  {
    id: '5',
    titulo: 'Exame de Urina',
    data: '10/06/2024',
    tipo: 'Laboratorial',
    imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Urina',
    validade: '10/09/2024',
    atendimentoTitulo: 'Check-up Anual',
    profissional: 'Dr. Pedro Oliveira',
    resultados: [
      { parametro: 'Aspecto', valor: 'Límpido', status: 'Normal' },
      { parametro: 'pH', valor: '6.0', status: 'Normal' },
      { parametro: 'Densidade', valor: '1.020', status: 'Normal' },
    ],
  },
  {
    id: '6',
    titulo: 'Ultrassom Abdominal',
    data: '25/05/2024',
    tipo: 'Imagem',
    imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Ultrassom',
    validade: '25/08/2024',
    atendimentoTitulo: 'Exame de Rotina',
    profissional: 'Dra. Ana Paula',
    resultados: [
      { parametro: 'Fígado', valor: 'Dimensões normais', status: 'Normal' },
      { parametro: 'Vesícula', valor: 'Sem alterações', status: 'Normal' },
    ],
  },
];

export default function ExameDetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const exame = mockExames.find(e => e.id === id);

  if (!exame) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1E2532" />
          </TouchableOpacity>
          <Text style={styles.title}>Detalhes do Exame</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Exame não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes do Exame</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card de informações do exame */}
        <View style={styles.infoCard}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: exame.imagem }}
              style={styles.examImage}
              resizeMode="cover"
            />
          </View>
          
          <Text style={styles.examTitle}>{exame.titulo}</Text>
          
          <View style={styles.examMetaRow}>
            <View style={styles.examMetaItem}>
              <Ionicons name="calendar-outline" size={18} color="#4576F2" />
              <Text style={styles.examMetaText}>Emitido em: {exame.data}</Text>
            </View>
            <View style={styles.examMetaItem}>
              <Ionicons name="time-outline" size={18} color="#4576F2" />
              <Text style={styles.examMetaText}>Válido até: {exame.validade}</Text>
            </View>
          </View>

          <View style={styles.examTypeTagContainer}>
            <View style={styles.examTypeTag}>
              <Text style={styles.examTypeText}>{exame.tipo}</Text>
            </View>
          </View>

          {exame.atendimentoTitulo && exame.profissional && (
            <View style={styles.atendimentoInfo}>
              <Text style={styles.atendimentoLabel}>Atendimento relacionado:</Text>
              <Text style={styles.atendimentoText}>
                {exame.atendimentoTitulo} • {exame.profissional}
              </Text>
            </View>
          )}
        </View>

        {/* Card de resultados */}
        <View style={styles.resultadosCard}>
          <Text style={styles.resultadosTitle}>Resultados do Exame</Text>
          
          {exame.resultados.map((resultado, index) => (
            <View key={index} style={styles.resultadoItem}>
              <View style={styles.resultadoHeader}>
                <Text style={styles.resultadoParametro}>{resultado.parametro}</Text>
                <View style={[
                  styles.resultadoStatusBadge,
                  resultado.status === 'Normal' ? styles.statusNormal : styles.statusAlterado
                ]}>
                  <Text style={[
                    styles.resultadoStatusText,
                    resultado.status === 'Normal' ? styles.statusNormalText : styles.statusAlteradoText
                  ]}>
                    {resultado.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.resultadoValor}>{resultado.valor}</Text>
            </View>
          ))}
        </View>

        {/* Botões de ação */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={20} color="#4576F2" />
            <Text style={styles.actionButtonText}>Baixar PDF</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#4576F2" />
            <Text style={styles.actionButtonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: { padding: 16 },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  examImage: {
    width: 200,
    height: 140,
    borderRadius: 12,
  },
  examTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  examMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  examMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  examMetaText: {
    fontSize: 13,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
  },
  examTypeTagContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  examTypeTag: {
    backgroundColor: '#E6F0FF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  examTypeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4576F2',
    fontFamily: 'Intelo-Bold',
  },
  atendimentoInfo: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  atendimentoLabel: {
    fontSize: 12,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  atendimentoText: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  resultadosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  resultadosTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
  },
  resultadoItem: {
    backgroundColor: '#F7F8FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  resultadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultadoParametro: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  resultadoStatusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusNormal: {
    backgroundColor: '#E8F5E9',
  },
  statusAlterado: {
    backgroundColor: '#FFEBEE',
  },
  resultadoStatusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  statusNormalText: {
    color: '#4CAF50',
  },
  statusAlteradoText: {
    color: '#F44336',
  },
  resultadoValor: {
    fontSize: 16,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#4576F2',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4576F2',
    fontFamily: 'Intelo-Bold',
  },
});
