import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Step2Props {
  professional: {
    id: number;
    name: string;
    clinic: string;
    verified: boolean;
    services: {
      id: number;
      name: string;
      description: string;
      price: number;
    }[];
  };
  selectedService: number | null;
  onSelectService: (serviceId: number) => void;
}

export const Step2 = ({ professional, selectedService, onSelectService }: Step2Props) => {
  return (
    <View style={styles.stepContent}>
      {/* Professional Card */}
      <View style={styles.professionalCard}>
        <Image 
          source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(professional.name.replace(/\s+/g, '').toLowerCase())}&backgroundColor=4576F2&size=200` }} 
          style={styles.professionalImage}
        />
        <View style={styles.professionalInfo}>
          <View style={styles.professionalHeader}>
            <Text style={styles.professionalName}>{professional.name}</Text>
            {professional.verified && (
              <Ionicons name="checkmark-circle" size={20} color="#01AEA4" style={{ marginLeft: 6 }} />
            )}
          </View>
          <View style={styles.clinicRow}>
            <Ionicons name="medkit-outline" size={16} color="#666666" />
            <Text style={styles.clinicText}>{professional.clinic}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Atendimentos Disponíveis</Text>

      {/* Service Cards */}
      {professional.services.map((service) => (
        <Pressable 
          key={service.id} 
          style={[
            styles.serviceCard,
            selectedService === service.id && styles.serviceCardSelected
          ]}
          onPress={() => onSelectService(service.id)}
        >
          <View style={styles.radioButton}>
            <View style={[
              styles.radioButtonInner,
              selectedService === service.id && styles.radioButtonInnerSelected
            ]} />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
          <View>
            <Text style={styles.servicePrice}>
              <Text style={styles.servicePriceSymbol}>R$ </Text>
              <Text style={styles.servicePriceBold}>{Math.floor(service.price)}</Text>
              <Text style={styles.servicePriceLight}>,{(service.price % 1).toFixed(2).slice(2)}</Text>
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    padding: 20,
  },
  professionalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  professionalImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  professionalInfo: {
    flex: 1,
  },
  professionalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginTop: 4,
  },
  clinicText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
    fontFamily: 'Intelo',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    fontFamily: 'Intelo',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  serviceCardSelected: {
    borderColor: '#4576F2',
    borderWidth: 2,
    backgroundColor: '#F5F8FF',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioButtonInnerSelected: {
    backgroundColor: '#4576F2',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
    fontFamily: 'Intelo',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Intelo',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 12,
    fontFamily: 'Intelo',
  },
  servicePriceSymbol: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  servicePriceBold: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  servicePriceLight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Intelo',
  },
});
