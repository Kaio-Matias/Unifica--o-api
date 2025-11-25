import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { DocumentsModal } from '../../modals/DocumentsModal';

interface Document {
  id: number;
  name: string;
  uri?: string;
  size?: number;
  mimeType?: string;
}

export const Step4 = () => {
  const [motivo, setMotivo] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddDocument = async () => {
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
        setDocuments([...documents, newDoc]);
      }
    } catch (error) {
      console.error('Erro ao selecionar documento:', error);
    }
  };

  const handleRemoveDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <View style={styles.stepContent}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Qual o motivo deste Atendimento?</Text>
          <Ionicons name="information-circle-outline" size={20} color="#6B7682" />
        </View>
        
        <TextInput
          style={styles.textArea}
          placeholder="Estou fazendo o retorno da consulta anterior com o resultado dos exames."
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={motivo}
          onChangeText={setMotivo}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Documentos para o Profissional</Text>
          <Text style={styles.optionalText}>(opcional)</Text>
        </View>

        <Pressable 
          style={styles.documentsButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.documentsButtonContent}>
            <Ionicons name="document-text-outline" size={20} color="#4576F2" />
            <Text style={styles.documentsButtonText}>
              {documents.length} Documento{documents.length !== 1 ? 's' : ''} adicionado{documents.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>

        <Text style={styles.helpText}>
          Adicione atestados, encaminhamentos, exames ou outros documentos que você deseja enviar ao profissional.
        </Text>
      </View>

      <DocumentsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        documents={documents}
        onAddDocument={handleAddDocument}
        onRemoveDocument={handleRemoveDocument}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
    flex: 1,
  },
  optionalText: {
    fontSize: 14,
    color: '#6B7682',
    fontFamily: 'Intelo',
    marginLeft: 4,
  },
  textArea: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Intelo',
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  documentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
    marginBottom: 12,
  },
  documentsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  documentsButtonText: {
    fontSize: 14,
    color: '#4576F2',
    fontFamily: 'Intelo',
    fontWeight: '600',
  },
  helpText: {
    fontSize: 12,
    color: '#6B7682',
    fontFamily: 'Intelo',
    lineHeight: 18,
  },
});
