import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

interface Document {
  id: number;
  name: string;
  uri?: string;
  size?: number;
  mimeType?: string;
}

export const Step6 = () => {
  const [requisicao, setRequisicao] = useState<Document | null>(null);

  const handleUploadRequisicao = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newDoc: Document = {
          id: Date.now(),
          name: asset.name,
          uri: asset.uri,
          size: asset.size,
          mimeType: asset.mimeType,
        };
        setRequisicao(newDoc);
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
      Alert.alert('Erro', 'Não foi possível carregar o documento');
    }
  };

  const handleRemoveRequisicao = () => {
    Alert.alert(
      'Remover Requisição',
      'Deseja remover a requisição médica?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => setRequisicao(null) }
      ]
    );
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <View style={styles.stepContent}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={32} color="#4576F2" />
        </View>
        <Text style={styles.title}>Requisição Médica</Text>
        <Text style={styles.subtitle}>
          Para realizar exames é necessário apresentar a requisição médica
        </Text>
      </View>

      {!requisicao ? (
        <Pressable style={styles.uploadButton} onPress={handleUploadRequisicao}>
          <Ionicons name="cloud-upload-outline" size={40} color="#4576F2" />
          <Text style={styles.uploadButtonText}>Fazer upload da requisição</Text>
          <Text style={styles.uploadButtonSubtext}>PDF ou imagem (máx. 10MB)</Text>
        </Pressable>
      ) : (
        <View style={styles.documentCard}>
          <View style={styles.documentInfo}>
            <View style={styles.documentIconContainer}>
              <Ionicons 
                name={requisicao.mimeType?.includes('pdf') ? 'document-text' : 'image'} 
                size={24} 
                color="#4576F2" 
              />
            </View>
            <View style={styles.documentDetails}>
              <Text style={styles.documentName} numberOfLines={1}>
                {requisicao.name}
              </Text>
              <Text style={styles.documentSize}>{formatFileSize(requisicao.size)}</Text>
            </View>
          </View>
          <Pressable onPress={handleRemoveRequisicao} style={styles.removeButton}>
            <Ionicons name="trash-outline" size={20} color="#FF6F91" />
          </Pressable>
        </View>
      )}

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={20} color="#4576F2" />
        <Text style={styles.infoText}>
          A requisição médica será enviada à clínica antes do atendimento. 
          Certifique-se de que o documento está legível.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Intelo',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Intelo',
    lineHeight: 20,
  },
  uploadButton: {
    backgroundColor: '#F5F8FF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4576F2',
    borderStyle: 'dashed',
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4576F2',
    marginTop: 12,
    fontFamily: 'Intelo',
  },
  uploadButtonSubtext: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    fontFamily: 'Intelo',
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
    marginBottom: 24,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  documentDetails: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
    marginBottom: 4,
  },
  documentSize: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Intelo',
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#4576F2',
    fontFamily: 'Intelo',
    lineHeight: 18,
  },
});
