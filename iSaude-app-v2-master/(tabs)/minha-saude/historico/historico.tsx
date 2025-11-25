import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoricoCard from '../../../../components/historico/HistoricoCard';
import { HistoricoItem, mockHistoricoData } from '../../../../components/historico/HistoricoData';

export default function HistoricoScreen() {
  const [searchText, setSearchText] = useState('');
  const [tipoAtendimento, setTipoAtendimento] = useState('todos');
  const [ordem, setOrdem] = useState('recentes');

  const tipoData = [
    { label: 'Todos os Atendimentos', value: 'todos' },
    { label: 'Consulta', value: 'consulta' },
    { label: 'Exame', value: 'exame' },
    { label: 'Cuidado', value: 'cuidado' },
  ];

  const ordemData = [
    { label: 'De recentes a mais antigos', value: 'recentes' },
    { label: 'De antigos a mais recentes', value: 'antigos' },
  ];

  // Função para ordenar dados por data
  const sortHistoricoData = (data: HistoricoItem[], order: string) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.data.split('/').reverse().join('-'));
      const dateB = new Date(b.data.split('/').reverse().join('-'));

      if (order === 'recentes') {
        return dateB.getTime() - dateA.getTime(); // Mais recentes primeiro
      } else {
        return dateA.getTime() - dateB.getTime(); // Mais antigos primeiro
      }
    });
  };

  // Função para formatar data como "Segunda, 21 de Abril"
  const formatDateHeader = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    const daysOfWeek = [
      'Domingo', 'Segunda', 'Terça', 'Quarta', 
      'Quinta', 'Sexta', 'Sábado'
    ];
    
    const monthsOfYear = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const monthName = monthsOfYear[date.getMonth()];
    
    return `${dayOfWeek}, ${dayOfMonth} de ${monthName}`;
  };

  // Função para agrupar dados por data
  const groupByDate = (data: HistoricoItem[], order: string) => {
    const grouped: { [key: string]: HistoricoItem[] } = {};
    
    data.forEach(item => {
      if (!grouped[item.data]) {
        grouped[item.data] = [];
      }
      grouped[item.data].push(item);
    });
    
    // Ordenar itens dentro de cada grupo por hora
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => {
        const timeA = a.hora.split(':').map(Number);
        const timeB = b.hora.split(':').map(Number);
        const minutesA = timeA[0] * 60 + timeA[1];
        const minutesB = timeB[0] * 60 + timeB[1];
        return minutesA - minutesB; // Ordem crescente (mais cedo primeiro)
      });
    });
    
    // Converter para array de seções ordenadas por data
    return Object.keys(grouped)
      .sort((a, b) => {
        const dateA = new Date(a.split('/').reverse().join('-'));
        const dateB = new Date(b.split('/').reverse().join('-'));
        if (order === 'recentes') {
          return dateB.getTime() - dateA.getTime();
        } else {
          return dateA.getTime() - dateB.getTime();
        }
      })
      .map(date => ({
        date,
        data: grouped[date]
      }));
  };

  // Função para filtrar dados
  const filterHistoricoData = (data: HistoricoItem[], search: string, tipo: string) => {
    return data.filter(item => {
      // Filtro de busca por texto
      const searchLower = search.toLowerCase();
      const matchesSearch = search === '' || 
        item.profissional.toLowerCase().includes(searchLower) ||
        item.titulo.toLowerCase().includes(searchLower) ||
        item.especialidade.toLowerCase().includes(searchLower) ||
        item.tipo.toLowerCase().includes(searchLower) ||
        item.local.toLowerCase().includes(searchLower);

      // Filtro por tipo de atendimento
      const matchesTipo = tipo === 'todos' || item.tipo === tipo;

      return matchesSearch && matchesTipo;
    });
  };

  const sortedData = sortHistoricoData(mockHistoricoData, ordem);
  const filteredData = filterHistoricoData(sortedData, searchText, tipoAtendimento);
  const groupedData = groupByDate(filteredData, ordem);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1E2532" />
          </TouchableOpacity>
          <Text style={styles.title}>Histórico de Atendimento</Text>
        </View>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#4A5463" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { fontFamily: 'Intelo-Bold', fontSize: 12 }]}
            placeholder="Busque por profissional, tipo de atendimento..."
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close" size={20} color="#4A5463" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.filtersRow}>
          <Dropdown
            style={styles.dropdown}
            data={tipoData}
            labelField="label"
            valueField="value"
            value={tipoAtendimento}
            onChange={item => setTipoAtendimento(item.value)}
            placeholder="Tipo de atendimento"
            maxHeight={200}
            fontFamily="Intelo-Bold"
            selectedTextStyle={{ fontSize: 9 }}
          />
          <Dropdown
            style={styles.dropdown}
            data={ordemData}
            labelField="label"
            valueField="value"
            value={ordem}
            onChange={item => setOrdem(item.value)}
            placeholder="Ordem"
            maxHeight={200}
            fontFamily="Intelo-Bold"
            selectedTextStyle={{ fontSize: 9 }}
          />
        </View>
      </View>
      <SectionList
        sections={groupedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoricoCard
            item={item}
            onPress={(historicoItem: HistoricoItem) => {
              router.push(`/minha-saude/historico/${historicoItem.id}`);
            }}
          />
        )}
        renderSectionHeader={({ section: { date } }) => (
          <View style={styles.dateHeader}>
            <Text style={styles.dateHeaderText}>{formatDateHeader(date)}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'column',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF1F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
    fontFamily: 'Intelo-Bold',
    fontSize: 12,
    color: '#4A5463',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    paddingHorizontal: 8,
    paddingVertical: 6,
    minHeight: 35,
    width: '48%',
  },
  dateHeader: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dateHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
  },
});