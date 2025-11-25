import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import DocumentCard from '../../../../components/minha-saude/DocumentCard';

// Dados mock de exames
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

export default function ResultadoScreen() {
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const sortData = [
    { label: 'Mais Recente', value: 'recent' },
    { label: 'Mais Antigo', value: 'oldest' },
  ];

  const filteredAndSortedExames = useMemo(() => {
    let filtered = mockExames;

    // Filtrar por texto de busca
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(exame =>
        exame.titulo.toLowerCase().includes(searchLower) ||
        exame.tipo.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data
    const sorted = [...filtered].sort((a, b) => {
      const dateA = a.data.split('/').reverse().join('');
      const dateB = b.data.split('/').reverse().join('');
      
      if (sortOrder === 'recent') {
        return dateB.localeCompare(dateA);
      } else {
        return dateA.localeCompare(dateB);
      }
    });

    return sorted;
  }, [searchText, sortOrder]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Resultados de Exames</Text>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#4A5463" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar por exame ou tipo..." 
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        
        <View style={styles.sortContainer}>
          <Dropdown
            style={styles.dropdown}
            data={sortData}
            labelField="label"
            valueField="value"
            value={sortOrder}
            onChange={item => setSortOrder(item.value)}
            placeholder="Ordenar por"
            maxHeight={200}
            fontFamily="Intelo-Bold"
            selectedTextStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownText}
          />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {filteredAndSortedExames.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="flask-outline" size={48} color="#6B7480" />
            <Text style={styles.emptyText}>Nenhum exame encontrado</Text>
            <Text style={styles.emptySubtext}>
              Tente ajustar os filtros de busca.
            </Text>
          </View>
        ) : (
          filteredAndSortedExames.map((exame) => (
            <DocumentCard
              key={exame.id}
              id={exame.id}
              titulo={exame.titulo}
              imagem={exame.imagem}
              validade={exame.validade}
              dataEmissao={exame.data}
              atendimentoTitulo={exame.atendimentoTitulo}
              profissional={exame.profissional}
              onPress={(id) => router.push(`/minha-saude/resultado/${id}` as any)}
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
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  sortContainer: {
    alignItems: 'flex-end',
  },
  dropdown: {
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 40,
    width: 160,
  },
  dropdownText: {
    fontSize: 13,
    fontFamily: 'Intelo-Bold',
    color: '#1E2532',
  },
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