import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HistoricoItem } from './HistoricoData';

interface HistoricoCardProps {
  item: HistoricoItem;
  onPress?: (item: HistoricoItem) => void;
}

export default function HistoricoCard({ item, onPress }: HistoricoCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return '#50C878';
      case 'cancelado':
        return '#E94B3C';
      case 'reagendado':
        return '#FFA500';
      default:
        return '#4A5463';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'Concluído';
      case 'reagendado':
        return 'Reagendado';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getTipoDisplay = (tipo: string, titulo: string) => {
    switch (tipo) {
      case 'consulta':
        return titulo || 'Consulta Geral';
      case 'exame':
        return titulo || 'Exame';
      case 'cuidado':
        return titulo || 'Cuidado';
      default:
        return titulo;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.topSection}>
        <View style={styles.profissionalContainer}>
          <Image
            source={item.avatar}
            style={styles.avatar}
          />
          <Text style={styles.profissionalNome}>{item.profissional}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.bottomSection}>
        <Text style={styles.tipoText}>{getTipoDisplay(item.tipo, item.titulo)}</Text>
        {item.rescheduleStatus === 'disponivel' && (
          <View style={styles.rescheduleContainer}>
            <View style={styles.rescheduleIndicator} />
            <Text style={styles.rescheduleText}>retorno disponível</Text>
          </View>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipoText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rescheduleIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#50C878',
  },
  rescheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rescheduleText: {
    fontSize: 12,
    color: '#50C878',
    fontFamily: 'Intelo-Bold',
  },
});