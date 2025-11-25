import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Document {
  id: number;
  name: string;
}

interface DocumentsModalProps {
  visible: boolean;
  onClose: () => void;
  documents: Document[];
  onAddDocument: () => void;
  onRemoveDocument: (id: number) => void;
}

export const DocumentsModal = ({
  visible,
  onClose,
  documents,
  onAddDocument,
  onRemoveDocument,
}: DocumentsModalProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Anexar Documentos</Text>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>
              Adicione atestados, encaminhamentos, exames ou outros documentos que você deseja enviar ao profissional.
            </Text>

            {/* Documents List */}
            <View style={styles.documentsList}>
              {documents.map((doc) => (
                <View key={doc.id} style={styles.documentItem}>
                  <View style={styles.documentInfo}>
                    <Ionicons name="document-text" size={20} color="#4576F2" />
                    <Text style={styles.documentName}>{doc.name}</Text>
                  </View>
                  <Pressable
                    onPress={() => onRemoveDocument(doc.id)}
                    hitSlop={8}
                  >
                    <Ionicons name="close-circle" size={20} color="#EF4444" />
                  </Pressable>
                </View>
              ))}
            </View>

            {/* Add Document Button */}
            <Pressable style={styles.addButton} onPress={onAddDocument}>
              <Text style={styles.addButtonText}>Novo Documento</Text>
              <Ionicons name="add" size={20} color="#4576F2" />
            </Pressable>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Pressable style={styles.concludeButton} onPress={onClose}>
              <Text style={styles.concludeButtonText}>Concluir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAF0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    fontSize: 14,
    color: '#6B7682',
    fontFamily: 'Intelo',
    lineHeight: 20,
    marginBottom: 24,
  },
  documentsList: {
    marginBottom: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Intelo',
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  addButtonText: {
    fontSize: 14,
    color: '#4576F2',
    fontFamily: 'Intelo',
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  concludeButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  concludeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Intelo',
    fontWeight: '600',
  },
});
