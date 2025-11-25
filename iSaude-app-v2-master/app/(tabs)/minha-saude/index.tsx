import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MinhaSaudeScreen() {
  const [value, setValue] = useState('all');
  const [searchText, setSearchText] = useState('');

  // Dados mock dos profissionais com tipos de serviço
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const professionalsData = [
    { 
      id: 1,
      name: "Dra. Maria Glendeswalter",
      clinic: "Clínica Geral",
      types: ["Teleconsulta", "Presencial"],
      location: "Mangueirão, Belém - PA",
      price: 109.9,
      verified: true,
      rating: 4.8,
      totalAppointments: 5000,
      availableDate: "Hoje, 28 de Abril",
      availableTimes: ["08:00", "08:30", "09:00"],
      serviceType: "Consultas", // Tipo de serviço
      profileType: "professional", // Tipo de perfil para agendamento
      featured: true
    },
    {
      id: 2,
      name: "Dra. Maria Glenda",
      clinic: "Clínica Geral",
      types: ["Teleconsulta", "Presencial"],
      location: "Mangueirão, Belém - PA",
      price: 199.9,
      verified: true,
      serviceType: "Consultas",
      profileType: "clinic-consultation"
    },
    {
      id: 3,
      name: "Dr. João Silva",
      clinic: "Cardiologia Viva",
      types: ["Presencial"],
      location: "Centro, Ananindeua - PA",
      price: 150,
      verified: false,
      serviceType: "Exames",
      profileType: "clinic-full"
    },
    {
      id: 4,
      name: "Dra. Ana Paula",
      clinic: "Saúde da Mulher",
      types: ["Teleconsulta"],
      location: "Batista Campos, Belém - PA",
      price: 120.5,
      verified: true,
      serviceType: "Consultas",
      profileType: "professional"
    },
    {
      id: 5,
      name: "Dr. Carlos Mendes",
      clinic: "Clínica do Coração",
      types: ["Presencial", "Teleconsulta"],
      location: "Marambaia, Belém - PA",
      price: 180,
      verified: false,
      serviceType: "Exames",
      profileType: "clinic-full"
    },
    {
      id: 6,
      name: "Dra. Fernanda Costa",
      clinic: "Bem Viver Pediatria",
      types: ["Teleconsulta"],
      location: "Coqueiro, Ananindeua - PA",
      price: 110,
      verified: true,
      serviceType: "Cuidadores",
      profileType: "professional"
    },
    {
      id: 7,
      name: "Dr. Rafael Souza",
      clinic: "Ortopedia Pará",
      types: ["Presencial"],
      location: "Icoaraci, Belém - PA",
      price: 160,
      verified: false,
      serviceType: "Consultas",
      profileType: "clinic-consultation"
    },
    {
      id: 8,
      name: "Dra. Sofia Lima",
      clinic: "Laboratório São Lucas",
      types: ["Presencial"],
      location: "Nazaré, Belém - PA",
      price: 89.9,
      verified: true,
      serviceType: "Exames",
      profileType: "clinic-full"
    },
    {
      id: 9,
      name: "Sr. Roberto Santos",
      clinic: "Cuidados Domiciliares",
      types: ["Presencial"],
      location: "Marco, Belém - PA",
      price: 75,
      verified: true,
      serviceType: "Cuidadores",
      profileType: "professional"
    }
  ];

  // Filtrar profissionais baseado na busca e cidade
  const filteredProfessionals = useMemo(() => {
    let filtered = professionalsData;

    // Filtrar por cidade
    if (value && value !== 'all') {
      filtered = filtered.filter(professional => {
        const cityState = professional.location.split(', ')[1]; // Extract "City - State" part
        return cityState === value;
      });
    }

    // Filtrar por busca (nome ou clínica)
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(professional =>
        professional.name.toLowerCase().includes(searchLower) ||
        professional.clinic.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [searchText, value, professionalsData]);

  const data = [
    { label: 'Todas as cidades', value: 'all' },
    { label: 'Belém - PA', value: 'Belém - PA' },
    { label: 'São Paulo - SP', value: 'São Paulo - SP' },
    { label: 'Rio de Janeiro - RJ', value: 'Rio de Janeiro - RJ' },
    { label: 'Salvador - BA', value: 'Salvador - BA' },
    { label: 'Brasília - DF', value: 'Brasília - DF' },
    { label: 'Recife - PE', value: 'Recife - PE' },
    { label: 'Porto Alegre - RS', value: 'Porto Alegre - RS' },
    { label: 'Fortaleza - CE', value: 'Fortaleza - CE' },
    { label: 'Manaus - AM', value: 'Manaus - AM' },
    { label: 'Curitiba - PR', value: 'Curitiba - PR' },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.appTitle}>Minha Saúde</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/minha-saude/opcoes')}>
          <Ionicons name="menu" size={24} color="#4576F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=SeuFlash&backgroundColor=4576F2&size=100' }} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}>
      {/* Cards */}
      <View style={styles.cardsRow}>
        <Pressable style={[styles.button, { backgroundColor: "#4576F2", }]} onPress={() => router.push('/minha-saude/informacoes' as any)}>
          <Text style={styles.buttonText}>Informações de Saúde</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: "#4576F2" }]} onPress={() => router.push('/minha-saude/resultado')}>
          <Text style={styles.buttonText}>Resultados de Exames</Text>
        </Pressable>
      <Pressable style={[styles.button, { backgroundColor: "#4576F2" }]} onPress={() => router.push('/minha-saude/MeusAgendamentos')}>
          <Text style={styles.buttonText}>Meus Agendamentos</Text>
        </Pressable>
      </View>                                                          

      {/* Buscar Atendimentos */}
      <Text style={styles.sectionTitle}>Buscar Atendimentos</Text>
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <Dropdown
            style={styles.dropdown}
            data={data}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => setValue(item.value)}
            placeholder="Selecione uma cidade"
            maxHeight={200}
            fontFamily="Intelo-Bold"
            selectedTextStyle={{ fontSize: 10 }}
            
          />
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#4A5463" style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInput, { fontFamily: 'Intelo-Bold', fontSize: 10 }]} 
              placeholder="Busque por especialidade..." 
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </View>

      {/* Tipos de serviço */}
      <View style={styles.typeRow}>
        <TypeButton 
          label="Consultas" 
          color="#01AEA4" 
          iconName="heart" 
        />
        <TypeButton 
          label="Exames" 
          color="#7F5CE1" 
          iconName="flask" 
        />
        <TypeButton 
          label="Cuidadores" 
          color="#FF7A7A" 
          iconName="person" 
        />
      </View>

      {/* Lista de profissionais */}
      <View style={{ marginTop: 24 }}>
        <FilteredProfessionalList professionals={filteredProfessionals} />
      </View>

    </ScrollView>
    </SafeAreaView>
  );
}

function TypeButton({ label, color, iconName }: { 
  label: string; 
  color: string; 
  iconName: string;
}) {
  return (
    <View 
      style={[
        styles.typeButton, 
        { backgroundColor: color }
      ]}
    >
      <Ionicons 
        name={iconName as any} 
        size={24} 
        color="#fff" 
        style={{ marginRight: 8 }} 
      />
      <Text style={styles.typeButtonText}>
        {label}
      </Text>
    </View>
  );
}

function FilteredProfessionalList({ professionals }: { professionals: any[] }) {
  return (
    <>
      {professionals.map((professional, index) => {
        if (professional.featured) {
          return (
            <Pressable 
              key={professional.id} 
              style={styles.featuredCardWrapper}
              onPress={() => router.push(`/minha-saude/profissional/${professional.id}` as any)}
            >
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}> Profissional em Destaque</Text>
              </View>
              <View style={styles.featuredCardContainer}>
                <View style={styles.cardTopSection}>
                  <Image 
                    source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(professional.name.replace(/\s+/g, '').toLowerCase())}&backgroundColor=4576F2&size=200` }} 
                    style={styles.avatar} 
                  />
                  <View style={styles.infoContainer}>
                    <View style={styles.headerRow}>
                      <Text style={styles.name}>{professional.name}</Text>
                      {professional.verified && (
                        <Ionicons name="checkmark-circle" size={20} color="#01AEA4" style={{ marginLeft: 6 }} />
                      )}
                    </View>
                    <Text style={styles.clinic}>
                      <Ionicons name="medkit-outline" size={16} color="#4A5463" /> {professional.clinic}
                    </Text>
                    <View style={styles.typesRow}>
                      {professional.types.map((type: string) => (
                        <View
                          key={type}
                          style={[styles.typeTag, type === 'Teleconsulta' ? styles.typeTele : styles.typePresencial]}
                        >
                          <Text style={[styles.typeText, type === 'Teleconsulta' ? { color: '#01AEA4' } : { color: '#FF7A7A' }]}>{type}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-outline" size={16} color="#1E2532" />
                      <Text style={styles.location}>{professional.location}</Text>
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>A partir de</Text>
                    <Text style={styles.price}>
                      <Text style={styles.currencySymbol}>R$ </Text>
                      {professional.price.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBottomSection}>
                  <Text style={{ fontSize: 14, fontFamily: 'Intelo-Bold', color: '#FFD700' }}>⭐ {professional.rating.toFixed(1)}</Text>
                  <Text style={styles.featuredTotalAppointments}>
                    <Text style={{ fontSize: 14, fontFamily: 'Intelo-Bold', color: '#01AEA4' }}>+</Text>
                    <Text style={{ fontSize: 14, fontFamily: 'Intelo-Bold', color: '#01AEA4' }}>{professional.totalAppointments}</Text>
                    {' '}<Text style={{ color: '#4A5463' }}>Atendimentos</Text>
                  </Text>
                  <Text style={styles.featuredAvailableDate}>Disponível: {professional.availableDate}</Text>
                  <View style={styles.featuredAvailableTimesRow}>
                    {professional.availableTimes.map((time: string) => (
                      <View key={time} style={styles.featuredTimeTag}>
                        <Text style={styles.featuredTimeText}>{time}</Text>
                      </View>
                    ))}
                    <Text style={[styles.featuredTimeText, { color: '#01AEA4' }]}>Ver mais</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        } else {
          return (
            <Pressable 
              key={professional.id} 
              style={[styles.card]}
              onPress={() => router.push(`/minha-saude/profissional/${professional.id}` as any)}
            >
              <Image 
                source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(professional.name.replace(/\s+/g, '').toLowerCase())}&backgroundColor=4576F2&size=200` }} 
                style={styles.avatar} 
              />
              <View style={styles.infoContainer}>
                <View style={styles.headerRow}>
                  <Text style={styles.name}>{professional.name}</Text>
                  {professional.verified && (
                    <Ionicons name="checkmark-circle" size={20} color="#01AEA4" style={{ marginLeft: 6 }} />
                  )}
                </View>
                <Text style={styles.clinic}>
                  <Ionicons name="medkit-outline" size={16} color="#4A5463" /> {professional.clinic}
                </Text>
                <View style={styles.typesRow}>
                  {professional.types.map((type: string) => (
                    <View
                      key={type}
                      style={[styles.typeTag, type === 'Teleconsulta' ? styles.typeTele : styles.typePresencial]}
                    >
                      <Text style={[styles.typeText, type === 'Teleconsulta' ? { color: '#01AEA4' } : { color: '#FF7A7A' }]}>{type}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={16} color="#1E2532" />
                  <Text style={styles.location}>{professional.location}</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>A partir de</Text>
                <Text style={styles.price}>
                  <Text style={styles.currencySymbol}>R$ </Text>
                  {professional.price.toFixed(2)}
                </Text>
              </View>
            </Pressable>
          );
        }
      })}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4576F2',
    letterSpacing: -0.5,
    fontFamily: 'Intelo-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  cardsRow: {
    fontFamily: 'Intelo-Bold',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 4,
  },
  button: {
    flex: 1,
    minWidth: 100,
    maxWidth: 220,
    minHeight: 50,
    borderRadius: 16,
    backgroundColor: '#4B7BE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Intelo-Bold',
    textAlign: 'left',
    paddingHorizontal: 12,
    paddingStart: 12,
  },
  sectionTitle: { marginTop: 32, marginLeft: 24, fontSize: 16, fontWeight: '600', color: '#1E2532',fontFamily: 'Intelo-Bold' },
  filterContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 8, marginHorizontal: 24, marginTop: 12, },
  filterRow: { flexDirection: 'row', alignItems: 'center' },
  dropdown: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E5E5EA', paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, minHeight: 40, width: 150 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8},
  searchIcon: { marginLeft: 8 },
  searchInput: { flex: 1, paddingHorizontal: 8, paddingVertical: 8 },
  typeRow: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 16, marginTop: 16 },
  typeButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 12, 
    padding: 10, 
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  typeButtonActive: {
    borderColor: '#4576F2',
  },
  typeButtonText: { fontWeight: '600', fontSize: 12, fontFamily: 'Intelo-Bold', color: '#fff' },
  professionalCard: { backgroundColor: '#fff', borderRadius: 16, marginHorizontal: 24, marginTop: 24, padding: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  professionalHighlight: { borderWidth: 2, borderColor: '#4B7BE5' },
  highlightBadge: { backgroundColor: '#4B7BE5', borderRadius: 8, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, marginBottom: 8 },
  highlightBadgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  professionalRow: { flexDirection: 'row', alignItems: 'center' },
  professionalImage: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  professionalName: { fontSize: 16, fontWeight: '700', color: '#1E2532' },
  professionalSpecialty: { fontSize: 14, color: '#4A5463', marginBottom: 4 },
  professionalRatingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  professionalRating: { fontSize: 13, color: '#4B7BE5', fontWeight: '600', marginRight: 8 },
  professionalReviews: { fontSize: 12, color: '#4A5463' },
  professionalTypesRow: { flexDirection: 'row', marginBottom: 4 },
  professionalType: { fontSize: 12, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginRight: 6 },
  typeTele: { backgroundColor: '#E6F0FF', color: '#4B7BE5' },
  typePresencial: { backgroundColor: '#FFE6E6', color: '#FF6F91' },
  professionalPriceCol: { alignItems: 'flex-end', marginLeft: 12 },
  professionalPriceLabel: { fontSize: 11, color: '#4A5463' },
  professionalPrice: { fontSize: 18, fontWeight: '700', color: '#1E2532' },
  professionalStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  professionalStats: { fontSize: 13, color: '#4B7BE5', fontWeight: '600' },
  professionalLocation: { fontSize: 12, color: '#4A5463' },
  professionalTimesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  professionalTimeBox: { backgroundColor: '#E6F0FF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8 },
  professionalTimeText: { color: '#4B7BE5', fontWeight: '600', fontSize: 13 },
  professionalSeeMore: { color: '#4B7BE5', fontWeight: '600', fontSize: 13, marginLeft: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    minHeight: 100,
    maxHeight: 120,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#E5EAF0',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E2532',
    flexShrink: 1,
  },
  clinic: {
    fontSize: 12,
    color: '#4A5463',
    marginBottom: 6,
    marginTop: 2,
  },
  typesRow: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 8,
  },
  typeTag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    backgroundColor: '#E6F0FF',
  },
  typeText: { fontSize: 11, fontWeight: '600' },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#1E2532',
    marginLeft: 4,
    flexShrink: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
    minWidth: 90,
  },
  priceLabel: {
    fontSize: 11,
    color: '#6B6E8F',
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  currencySymbol: {
    fontSize: 10,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  featuredCardWrapper: {
    position: 'relative',
    marginTop: 20,
    marginHorizontal: 16,
  },
  featuredBadge: {
    position: 'absolute',
    top: -4,
    alignSelf: 'center',
    backgroundColor: '#01AEA4',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  featuredCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#01AEA4',
  },
  cardTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100,
    maxHeight: 120,
  },
  cardBottomSection: {
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
  },
  featuredTotalAppointments: {
    fontSize: 12,
    color: '#01AEA4',
    marginBottom: 8,
  },
  featuredAvailableDate: {
    fontSize: 12,
    color: '#4A5463',
    marginBottom: 4,
  },
  featuredAvailableTimesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  featuredTimeTag: {
    backgroundColor: '#E5EAF0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  featuredTimeText: {
    fontSize: 12,
    color: '#1E2532',
  },
});