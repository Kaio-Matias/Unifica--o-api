import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface DocumentCardProps {
  id: string;
  titulo: string;
  imagem: string;
  validade: string;
  dataEmissao: string;
  atendimentoTitulo?: string;
  profissional?: string;
  onPress: (id: string) => void;
}

export default function DocumentCard({
  id,
  titulo,
  imagem,
  validade,
  dataEmissao,
  atendimentoTitulo,
  profissional,
  onPress,
}: DocumentCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imagem }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.validity}>
          Válido até: {validade}
        </Text>
        {atendimentoTitulo && profissional && (
          <Text style={styles.atendimento}>
            {atendimentoTitulo} • {profissional}
          </Text>
        )}
        <Text style={styles.date}>
          Emitido em: {dataEmissao}
        </Text>
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
    alignItems: 'flex-start',
  },
  imageContainer: {
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  info: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  validity: {
    fontSize: 14,
    color: '#030303ff',
    fontFamily: 'Intelo-Bold',
    marginBottom: 2,
    textAlign: 'left',
  },
  atendimento: {
    fontSize: 13,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#8A92A0',
    fontFamily: 'Intelo-Bold',
  },
});
