import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DocumentCard from '../../../../components/minha-saude/DocumentCard';

// Dados mock para documentos
interface Documento {
  id: string;
  tipo: 'atestado' | 'prescricao' | 'exame' | 'receita';
  titulo: string;
  validade: string;
  imagem: string;
  dataEmissao: string;
  atendimentoId: string;
  atendimentoTitulo: string;
  profissional: string;
  dataAtendimento: string;
}

const mockDocumentos: { [key: string]: Documento[] } = {
  '1': [
    {
      id: 'doc1',
      tipo: 'atestado',
      titulo: 'Atestado Médico',
      validade: '15/11/2024',
      imagem: 'https://via.placeholder.com/150x100/4576F2/FFFFFF?text=Atestado',
      dataEmissao: '15/10/2024',
      atendimentoId: '1',
      atendimentoTitulo: 'Consulta de Rotina',
      profissional: 'Dr. João Silva',
      dataAtendimento: '15/10/2024',
    },
    {
      id: 'doc2',
      tipo: 'prescricao',
      titulo: 'Prescrição de Remédios',
      validade: '15/12/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '15/10/2024',
      atendimentoId: '1',
      atendimentoTitulo: 'Consulta de Rotina',
      profissional: 'Dr. João Silva',
      dataAtendimento: '15/10/2024',
    },
  ],
  '2': [
    {
      id: 'doc3',
      tipo: 'exame',
      titulo: 'Raio X - Tórax',
      validade: '15/11/2024',
      imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Raio+X',
      dataEmissao: '12/10/2024',
      atendimentoId: '2',
      atendimentoTitulo: 'Exames de Imagem',
      profissional: 'Dra. Maria Santos',
      dataAtendimento: '12/10/2024',
    },
    {
      id: 'doc3b',
      tipo: 'prescricao',
      titulo: 'Prescrição Pós-Exame',
      validade: '15/12/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '12/10/2024',
      atendimentoId: '2',
      atendimentoTitulo: 'Exames de Imagem',
      profissional: 'Dra. Maria Santos',
      dataAtendimento: '12/10/2024',
    },
    {
      id: 'doc3c',
      tipo: 'atestado',
      titulo: 'Atestado de Comparecimento',
      validade: '15/11/2024',
      imagem: 'https://via.placeholder.com/150x100/4576F2/FFFFFF?text=Atestado',
      dataEmissao: '12/10/2024',
      atendimentoId: '2',
      atendimentoTitulo: 'Exames de Imagem',
      profissional: 'Dra. Maria Santos',
      dataAtendimento: '12/10/2024',
    },
  ],
  '3': [
    {
      id: 'doc4',
      tipo: 'atestado',
      titulo: 'Atestado Médico',
      validade: '25/11/2024',
      imagem: 'https://via.placeholder.com/150x100/4576F2/FFFFFF?text=Atestado',
      dataEmissao: '20/10/2024',
      atendimentoId: '3',
      atendimentoTitulo: 'Check-up Anual',
      profissional: 'Dr. Pedro Oliveira',
      dataAtendimento: '20/10/2024',
    },
    {
      id: 'doc4b',
      tipo: 'prescricao',
      titulo: 'Prescrição de Medicamentos',
      validade: '25/12/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '20/10/2024',
      atendimentoId: '3',
      atendimentoTitulo: 'Check-up Anual',
      profissional: 'Dr. Pedro Oliveira',
      dataAtendimento: '20/10/2024',
    },
  ],
  '5': [
    {
      id: 'doc5',
      tipo: 'prescricao',
      titulo: 'Prescrição de Remédios',
      validade: '20/11/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '15/10/2024',
      atendimentoId: '5',
      atendimentoTitulo: 'Acompanhamento Clínico',
      profissional: 'Dra. Carla Lima',
      dataAtendimento: '15/10/2024',
    },
    {
      id: 'doc6',
      tipo: 'exame',
      titulo: 'Hemograma Completo',
      validade: '20/11/2024',
      imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Hemograma',
      dataEmissao: '15/10/2024',
      atendimentoId: '5',
      atendimentoTitulo: 'Acompanhamento Clínico',
      profissional: 'Dra. Carla Lima',
      dataAtendimento: '15/10/2024',
    },
  ],
  '7': [
    {
      id: 'doc7',
      tipo: 'atestado',
      titulo: 'Atestado Médico',
      validade: '30/11/2024',
      imagem: 'https://via.placeholder.com/150x100/4576F2/FFFFFF?text=Atestado',
      dataEmissao: '22/10/2024',
      atendimentoId: '7',
      atendimentoTitulo: 'Vacinação',
      profissional: 'Enf. Ana Costa',
      dataAtendimento: '22/10/2024',
    },
    {
      id: 'doc7b',
      tipo: 'prescricao',
      titulo: 'Prescrição Vacinal',
      validade: '30/12/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '22/10/2024',
      atendimentoId: '7',
      atendimentoTitulo: 'Vacinação',
      profissional: 'Enf. Ana Costa',
      dataAtendimento: '22/10/2024',
    },
    {
      id: 'doc7c',
      tipo: 'exame',
      titulo: 'Carteira de Vacinação',
      validade: '30/11/2025',
      imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Carteira',
      dataEmissao: '22/10/2024',
      atendimentoId: '7',
      atendimentoTitulo: 'Vacinação',
      profissional: 'Enf. Ana Costa',
      dataAtendimento: '22/10/2024',
    },
  ],
  '8': [
    {
      id: 'doc8',
      tipo: 'exame',
      titulo: 'Exame Oftalmológico',
      validade: '25/11/2024',
      imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Oftalmo',
      dataEmissao: '18/10/2024',
      atendimentoId: '8',
      atendimentoTitulo: 'Consulta Oftalmológica',
      profissional: 'Dr. Fernando Alves',
      dataAtendimento: '18/10/2024',
    },
    {
      id: 'doc8b',
      tipo: 'prescricao',
      titulo: 'Prescrição de Óculos',
      validade: '25/12/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '18/10/2024',
      atendimentoId: '8',
      atendimentoTitulo: 'Consulta Oftalmológica',
      profissional: 'Dr. Fernando Alves',
      dataAtendimento: '18/10/2024',
    },
  ],
  '11': [
    {
      id: 'doc9',
      tipo: 'atestado',
      titulo: 'Atestado Médico',
      validade: '20/11/2024',
      imagem: 'https://via.placeholder.com/150x100/4576F2/FFFFFF?text=Atestado',
      dataEmissao: '15/10/2024',
      atendimentoId: '11',
      atendimentoTitulo: 'Curativo',
      profissional: 'Enf. Paula Rocha',
      dataAtendimento: '15/10/2024',
    },
    {
      id: 'doc9b',
      tipo: 'prescricao',
      titulo: 'Prescrição de Curativos',
      validade: '20/12/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '15/10/2024',
      atendimentoId: '11',
      atendimentoTitulo: 'Curativo',
      profissional: 'Enf. Paula Rocha',
      dataAtendimento: '15/10/2024',
    },
    {
      id: 'doc9c',
      tipo: 'exame',
      titulo: 'Relatório de Curativo',
      validade: '20/11/2024',
      imagem: 'https://via.placeholder.com/150x100/E94B3C/FFFFFF?text=Relatorio',
      dataEmissao: '15/10/2024',
      atendimentoId: '11',
      atendimentoTitulo: 'Curativo',
      profissional: 'Enf. Paula Rocha',
      dataAtendimento: '15/10/2024',
    },
  ],
  '12': [
    {
      id: 'doc10',
      tipo: 'prescricao',
      titulo: 'Prescrição de Remédios',
      validade: '30/11/2024',
      imagem: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Prescricao',
      dataEmissao: '23/10/2024',
      atendimentoId: '12',
      atendimentoTitulo: 'Consulta Psiquiátrica',
      profissional: 'Dra. Beatriz Mendes',
      dataAtendimento: '23/10/2024',
    },
    {
      id: 'doc10b',
      tipo: 'atestado',
      titulo: 'Atestado Psiquiátrico',
      validade: '30/11/2024',
      imagem: 'https://via.placeholder.com/150x100/4576F2/FFFFFF?text=Atestado',
      dataEmissao: '23/10/2024',
      atendimentoId: '12',
      atendimentoTitulo: 'Consulta Psiquiátrica',
      profissional: 'Dra. Beatriz Mendes',
      dataAtendimento: '23/10/2024',
    },
  ],
};

export default function PrescricoesScreen() {
  // Agregar todos os documentos de todos os atendimentos
  const todosDocumentos: Documento[] = [];
  Object.values(mockDocumentos).forEach((docs) => {
    todosDocumentos.push(...docs);
  });

  // Ordenar por data de emissão (mais recente primeiro)
  todosDocumentos.sort((a, b) => {
    const dateA = a.dataEmissao.split('/').reverse().join('');
    const dateB = b.dataEmissao.split('/').reverse().join('');
    return dateB.localeCompare(dateA);
  });

  const getTipoDisplay = (tipo: string) => {
    switch (tipo) {
      case 'atestado':
        return 'Atestado Médico';
      case 'prescricao':
        return 'Prescrição de Remédios';
      case 'exame':
        return 'Resultado de Exame';
      case 'receita':
        return 'Receita';
      default:
        return tipo;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Prescrições e Atestados</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {todosDocumentos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-outline" size={48} color="#6B7480" />
            <Text style={styles.emptyText}>Nenhum documento disponível</Text>
            <Text style={styles.emptySubtext}>
              Você ainda não possui documentos emitidos nos seus atendimentos.
            </Text>
          </View>
        ) : (
          todosDocumentos.map((documento) => (
            <DocumentCard
              key={documento.id}
              id={documento.id}
              titulo={getTipoDisplay(documento.tipo)}
              imagem={documento.imagem}
              validade={documento.validade}
              dataEmissao={documento.dataEmissao}
              atendimentoTitulo={documento.atendimentoTitulo}
              profissional={documento.profissional}
              onPress={(id) => {
                // Futuramente pode navegar para detalhes do documento
                console.log('Documento clicado:', id);
              }}
            />
          ))
        )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});