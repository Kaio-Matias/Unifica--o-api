import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Step1Props {
  selectedCategory: 'consulta' | 'exame' | null;
  onSelectCategory: (category: 'consulta' | 'exame') => void;
}

export const Step1 = ({ selectedCategory, onSelectCategory }: Step1Props) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.title}>Escolha o tipo de atendimento</Text>
      <Text style={styles.subtitle}>Selecione se você deseja agendar uma consulta ou um exame</Text>

      <View style={styles.cardsContainer}>
        {/* Card Consulta */}
        <Pressable
          style={[
            styles.card,
            selectedCategory === 'consulta' && styles.cardSelected
          ]}
          onPress={() => onSelectCategory('consulta')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E6F7F5' }]}>
            <Ionicons name="person-outline" size={32} color="#01AEA4" />
          </View>
          <Text style={styles.cardTitle}>Consulta</Text>
          <Text style={styles.cardDescription}>
            Agende uma consulta médica presencial ou por teleconsulta
          </Text>
          <View style={[
            styles.radioButton,
            selectedCategory === 'consulta' && styles.radioButtonSelected
          ]}>
            {selectedCategory === 'consulta' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </Pressable>

        {/* Card Exame */}
        <Pressable
          style={[
            styles.card,
            selectedCategory === 'exame' && styles.cardSelected
          ]}
          onPress={() => onSelectCategory('exame')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="flask-outline" size={32} color="#7F5CE1" />
          </View>
          <Text style={styles.cardTitle}>Exame</Text>
          <Text style={styles.cardDescription}>
            Agende exames laboratoriais ou de imagem
          </Text>
          <View style={[
            styles.radioButton,
            selectedCategory === 'exame' && styles.radioButtonSelected
          ]}>
            {selectedCategory === 'exame' && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Intelo',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
    fontFamily: 'Intelo',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#4576F2',
    backgroundColor: '#F5F8FF',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Intelo',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    fontFamily: 'Intelo',
  },
  radioButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4576F2',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4576F2',
  },
});
