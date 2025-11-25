import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AtendimentoConcluidoScreen() {
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handleStarPress = (starRating: number) => {
    setRating(starRating);
    setModalVisible(true);
  };

  const handlePublishReview = () => {
    console.log(`Avaliação publicada: ${rating} estrelas, comentário: ${comment}`);
    // Aqui você pode implementar a lógica para enviar a avaliação para o backend
    setModalVisible(false);
    setThankYouModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setComment('');
  };

  const handleBackToHome = () => {
    setThankYouModalVisible(false);
    setComment('');
    setRating(0);
    router.push('/minha-saude');
  };

  const renderStars = (interactive: boolean = true) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={interactive ? () => handleStarPress(star) : undefined}
            style={styles.starButton}
            disabled={!interactive}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={interactive ? 32 : 40}
              color={star <= rating ? "#FFD700" : "#D1D5DB"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const handleNavigateToAppointment = () => {
    // Navegar para a página de detalhes do atendimento
    router.push('/minha-saude/MeusAgendamentos');
  };

  const handleShareProfessional = async () => {
    try {
      const result = await Share.share({
        message: 'Encontrei um profissional incrível na nossa plataforma! Recomendo para todos que precisam de atendimento de qualidade. #Saude #Profissional #Recomendacao',
        title: 'Compartilhar Profissional',
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Compartilhado com:', result.activityType);
        } else {
          console.log('Conteúdo compartilhado');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento cancelado');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const handleHelpSupport = () => {
    // Lógica para ajuda e suporte
    console.log('Ajuda e suporte');
  };

  const handleReportAppointment = () => {
    // Lógica para denunciar atendimento
    console.log('Denunciar atendimento');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/minha-saude/MeusAgendamentos')}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Atendimento Concluído</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.successText}>Atendimento finalizado com Sucesso.</Text>
        
        <Text style={styles.descriptionText}>
          A consulta foi encerrada pelo profissional. Este atendimento possui um retorno incluso, vá até a página do atendimento para agendar o retorno.
        </Text>

        <View style={styles.ratingSection}>
          <Text style={styles.ratingText}>Como você avalia esse atendimento?</Text>
          {renderStars()}
          <Image 
            source={require('../../../../assets/images/agendamento.png')} 
            style={styles.ratingImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleNavigateToAppointment}>
            <Ionicons name="document-text-outline" size={24} color="#4576F2" />
            <Text style={styles.buttonText}>Página do Atendimento</Text>
            <Ionicons name="chevron-forward" size={24} color="#4576F2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleShareProfessional}>
            <Ionicons name="share-outline" size={24} color="#4576F2" />
            <Text style={styles.buttonText}>Compartilhar Profissional</Text>
            <Ionicons name="chevron-forward" size={24} color="#4576F2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleHelpSupport}>
            <Ionicons name="help-circle-outline" size={24} color="#4576F2" />
            <Text style={styles.buttonText}>Ajuda e Suporte</Text>
            <Ionicons name="chevron-forward" size={24} color="#4576F2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleReportAppointment}>
            <Ionicons name="warning-outline" size={24} color="#FF7A7A" />
            <Text style={[styles.buttonText, styles.reportButtonText]}>Denunciar Atendimento</Text>
            <Ionicons name="chevron-forward" size={24} color="#FF7A7A" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Avaliar Atendimento</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#1E2532" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>Sua avaliação:</Text>
              {renderStars(false)}
              
              <Text style={styles.commentLabel}>Comentário (opcional):</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Conte-nos mais sobre sua experiência..."
                placeholderTextColor="#9CA3AF"
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={handleCloseModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.publishButton]} 
                onPress={handlePublishReview}
              >
                <Text style={styles.publishButtonText}>Publicar Avaliação</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={false}
        visible={thankYouModalVisible}
        onRequestClose={() => setThankYouModalVisible(false)}
      >
        <SafeAreaView style={styles.thankYouContainer}>
          <View style={styles.thankYouContent}>
            <Image 
              source={require('../../../../assets/images/agendamento2.png')} 
              style={styles.thankYouImage}
              resizeMode="contain"
            />
            
            <View style={styles.thankYouTextContainer}>
              <Text style={styles.thankYouTitle}>Obrigado por avaliar!</Text>
              <Text style={styles.thankYouMessage}>
                Com a sua ajuda tornamos nossa comunidade cada vez mais segura e acolhedora para todos.
              </Text>
            </View>
          </View>

          <View style={styles.thankYouFooter}>
            <TouchableOpacity 
              style={styles.backToHomeButton} 
              onPress={handleBackToHome}
            >
              <Text style={styles.backToHomeButtonText}>Voltar para o início</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'left',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B7480',
    fontFamily: 'Intelo',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 32,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ratingImage: {
    width: 400,
    height: 200,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#EFF1F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  buttonText: {
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    flex: 1,
    marginLeft: 12,
  },
  reportButtonText: {
    color: '#FF7A7A',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginTop: 24,
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#E5EAF0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#EFF1F5',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
  },
  publishButton: {
    backgroundColor: '#4576F2',
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
  thankYouContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  thankYouContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  thankYouImage: {
    width: 300,
    height: 200,
    marginBottom: 40,
  },
  thankYouTextContainer: {
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 300,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'left',
    marginBottom: 16,
  },
  thankYouMessage: {
    fontSize: 16,
    color: '#6B7480',
    fontFamily: 'Intelo',
    textAlign: 'left',
    lineHeight: 24,
  },
  thankYouFooter: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  backToHomeButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backToHomeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
});