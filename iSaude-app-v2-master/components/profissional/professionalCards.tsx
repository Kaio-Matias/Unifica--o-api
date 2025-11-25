import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ProfessionalCardProps {
  name: string;
  clinic: string;
  types: string[];
  location: string;
  price: number;
  verified?: boolean;
  featured?: boolean;
}

interface FeaturedProfessionalCardProps {
  name: string;
  clinic: string;
  types: string[];
  location: string;
  price: number;
  verified?: boolean;
  rating: number;
  totalAppointments: number;
  availableDate: string;
  availableTimes: string[];
}

function generateAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name.replace(/\s+/g, '').toLowerCase());
  return `https://api.dicebear.com/7.x/avataaars/png?seed=${seed}&backgroundColor=4576F2&size=200`;
}

export function ProfessionalCard({
  name,
  clinic,
  types,
  location,
  price,
  verified = false,
  featured = false,
}: ProfessionalCardProps) {
  const avatarUrl = generateAvatarUrl(name);
  return (
    <View style={[styles.card, featured && styles.featuredCard]}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, featured && styles.featuredText]}>{name}</Text>
          {verified && (
            <Ionicons name="checkmark-circle" size={20} color={featured ? "#FFFFFF" : "#01AEA4"} style={{ marginLeft: 6 }} />
          )}
        </View>
        <Text style={[styles.clinic, featured && styles.featuredText]}>
          <Ionicons name="medkit-outline" size={16} color={featured ? "#FFFFFF" : "#4A5463"} /> {clinic}
        </Text>
        <View style={styles.typesRow}>
          {types.map(type => (
            <View
              key={type}
              style={[styles.typeTag, type === 'Teleconsulta' ? styles.typeTele : styles.typePresencial]}
            >
              <Text style={[styles.typeText, type === 'Teleconsulta' ? { color: featured ? '#FFFFFF' : '#01AEA4' } : { color: featured ? '#FFFFFF' : '#FF7A7A' }]}>{type}</Text>
            </View>
          ))}
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color={featured ? "#FFFFFF" : "#1E2532"} />
          <Text style={[styles.location, featured && styles.featuredText]}>{location}</Text>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={[styles.priceLabel, featured && styles.featuredText]}>A partir de</Text>
        <Text style={[styles.price, featured && styles.featuredText]}>
          <Text style={styles.currencySymbol}>R$ </Text>
          {price.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

export function FeaturedProfessionalCard({
  name,
  clinic,
  types,
  location,
  price,
  verified = false,
  rating,
  totalAppointments,
  availableDate,
  availableTimes,
}: FeaturedProfessionalCardProps) {
  const avatarUrl = generateAvatarUrl(name);
  return (
    <View style={styles.featuredCardWrapper}>
      <View style={styles.featuredBadge}>
        <Text style={styles.featuredBadgeText}> Profissional em Destaque</Text>
      </View>

      <View style={styles.featuredCardContainer}>
        <View style={styles.cardTopSection}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.name}>{name}</Text>
              {verified && (
                <Ionicons name="checkmark-circle" size={20} color="#01AEA4" style={{ marginLeft: 6 }} />
              )}
            </View>
            <Text style={styles.clinic}>
              <Ionicons name="medkit-outline" size={16} color="#4A5463" /> {clinic}
            </Text>
            <View style={styles.typesRow}>
              {types.map(type => (
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
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>A partir de</Text>
            <Text style={styles.price}>
              <Text style={styles.currencySymbol}>R$ </Text>
              {price.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.cardBottomSection}>
          <Text style={{ fontSize: 14, fontFamily: 'Intelo-Bold', color: '#FFD700' }}>⭐ {rating.toFixed(1)}</Text>
          <Text style={styles.featuredTotalAppointments}>
            <Text style={{ fontSize: 14, fontFamily: 'Intelo-Bold', color: '#01AEA4' }}>+</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Intelo-Bold', color: '#01AEA4' }}>{totalAppointments}</Text>
            {' '}<Text style={{ color: '#4A5463' }}>Atendimentos</Text>
          </Text>
          <Text style={styles.featuredAvailableDate}>Disponível: {availableDate}</Text>
          <View style={styles.featuredAvailableTimesRow}>
            {availableTimes.map(time => (
              <View key={time} style={styles.featuredTimeTag}>
                <Text style={styles.featuredTimeText}>{time}</Text>
              </View>
            ))}
            <Text style={[styles.featuredTimeText, { color: '#01AEA4' }]}>Ver mais</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export function ProfessionalCardsMockList() {
  return (
    <>
      <FeaturedProfessionalCard
        name="Dra. Maria Glendeswalter"
        clinic="Clínica Geral"
        types={["Teleconsulta", "Presencial"]}
        location="Mangueirão, Belém - PA"
        price={109.9}
        verified={true}
        rating={4.8}
        totalAppointments={5000}
        availableDate="Hoje, 28 de Abril"
        availableTimes={["08:00", "08:30", "09:00"]}
      />
      <ProfessionalCard
        name="Dra. Maria Glenda"
        clinic="Clínica Geral"
        types={["Teleconsulta", "Presencial"]}
        location="Mangueirão, Belém - PA"
        price={199.9}
        verified={true}
      />
      <ProfessionalCard
        name="Dr. João Silva"
        clinic="Cardiologia Viva"
        types={["Presencial"]}
        location="Centro, Ananindeua - PA"
        price={150}
        verified={false}
      />
      <ProfessionalCard
        name="Dra. Ana Paula"
        clinic="Saúde da Mulher"
        types={["Teleconsulta"]}
        location="Batista Campos, Belém - PA"
        price={120.5}
        verified={true}
      />
      <ProfessionalCard
        name="Dr. Carlos Mendes"
        clinic="Clínica do Coração"
        types={["Presencial", "Teleconsulta"]}
        location="Marambaia, Belém - PA"
        price={180}
        verified={false}
      />
      <ProfessionalCard
        name="Dra. Fernanda Costa"
        clinic="Bem Viver Pediatria"
        types={["Teleconsulta"]}
        location="Coqueiro, Ananindeua - PA"
        price={110}
        verified={true}
      />
      <ProfessionalCard
        name="Dr. Rafael Souza"
        clinic="Ortopedia Pará"
        types={["Presencial"]}
        location="Icoaraci, Belém - PA"
        price={160}
        verified={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  featuredCard: {
    backgroundColor: '#4576F2',
    
    
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
  typeTele: { backgroundColor: '#E6F0FF' },
  typePresencial: { backgroundColor: '#FFE6E6' },
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
  featuredText: {
    color: '#1E2532',
  },
});
