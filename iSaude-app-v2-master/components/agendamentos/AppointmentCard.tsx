import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AppointmentCardProps {
  item: {
    id: string;
    avatar: string;
    name: string;
    date: string;
    time: string;
    type: string;
    description: string;
  };
  onPress?: (item: any) => void;
}

export default function AppointmentCard({ item, onPress }: AppointmentCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.topSection}>
        <View style={styles.profissionalContainer}>
          <Image
            source={{ uri: item.avatar }}
            style={styles.avatar}
          />
          <Text style={styles.profissionalNome}>{item.name}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Agendado</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.bottomSection}>
        <Text style={styles.tipoText}>{item.type}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profissionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 12,
    marginRight: 8,
  },
  profissionalNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#4576F2',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 12,
  },
  bottomSection: {
    flexDirection: 'column',
    gap: 4,
  },
  tipoText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  descriptionText: {
    fontSize: 12,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
  },
});