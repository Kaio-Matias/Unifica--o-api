import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppointmentCard from '../../../../components/agendamentos/AppointmentCard';
import { mockAgendamentos } from './index';

export default function AgendamentoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);

  const item = mockAgendamentos.find(a => a.id === id);

  const copyToClipboard = async (code: string) => {
    // Simulação de cópia - em produção usaria Clipboard.setStringAsync
    Alert.alert('Código copiado!', `Código ${code} copiado para a área de transferência.`);
  };

  const handleHelpSupport = () => {
    setModalVisible(false);
    Alert.alert('Ajuda e Suporte', 'Em breve você será direcionado para o suporte.');
  };

  const handleReschedule = () => {
    setModalVisible(false);
    // Navega para a tela de reagendamento (passa o id como query opcional)
    router.push(`/minha-saude/agendamentos/reagendar?id=${id}` as any);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setCancelModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setCancelModalVisible(false);
    Alert.alert('Cancelado', 'Agendamento cancelado com sucesso.');
  };

  const handleEnterRoom = () => {
    setTermsModalVisible(true);
  };

  const handleAgreeTerms = () => {
    setTermsModalVisible(false);
    router.push('/minha-saude/atendimentos/sala-atendimento'); // Navega para tela mockada
  };

  // Função para formatar o código com máscara 0000-000000
  const formatRoomCode = (code: string) => {
    // Remove qualquer caracter não numérico
    const numericCode = code.replace(/\D/g, '');
    // Aplica a máscara 0000-000000
    if (numericCode.length >= 10) {
      return `${numericCode.slice(0, 4)}-${numericCode.slice(4, 10)}`;
    }
    // Se não tiver 10 dígitos, retorna o código original
    return code;
  };

  if (!item) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" onPress={() => router.back()} />
          <Text style={styles.title}>Atendimento Agendado</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Agendamento não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" onPress={() => router.back()} />
          <Text style={styles.title}>Atendimento Agendado</Text>
        </View>
        <TouchableOpacity style={styles.optionsButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1E2532" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer} edges={['top']}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBackButton}>
              <Ionicons name="arrow-back" size={24} color="#1E2532" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Opções</Text>
          </View>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            <TouchableOpacity style={styles.menuButton} onPress={handleHelpSupport}>
              <View style={styles.menuButtonLeft}>
                <Ionicons name="help-circle-outline" size={24} color="#4576F2" />
                <Text style={styles.menuButtonText}>Ajuda e Suporte</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4576F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleReschedule}>
              <View style={styles.menuButtonLeft}>
                <Ionicons name="calendar-outline" size={24} color="#4576F2" />
                <Text style={styles.menuButtonText}>Reagendar Atendimento</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#4576F2" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuButton, styles.cancelMenuButton]} onPress={handleCancel}>
              <View style={styles.menuButtonLeft}>
                <Ionicons name="close" size={24} color="#FF7A7A" />
                <Text style={[styles.menuButtonText, styles.cancelMenuButtonText]}>Cancelar Agendamento</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FF7A7A" />
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.cancelModalOverlay}>
          <View style={styles.cancelModalContent}>
            <Text style={styles.cancelModalTitle}>
              Você tem certeza que deseja cancelar o atendimento?
            </Text>
            <Text style={styles.cancelModalText}>
              A Consulta Geral com a {item.name} agendada para {item.date} será cancelada. Não é possível desfazer essa ação e será cobrada uma multa de 30% do valor do atendimento.
            </Text>
            <View style={styles.cancelModalButtons}>
              <TouchableOpacity
                style={styles.cancelModalConfirmButton}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.cancelModalConfirmButtonText}>Sim, Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelModalBackButton}
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={styles.cancelModalBackButtonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={() => setTermsModalVisible(false)}
      >
        <SafeAreaView style={styles.termsModalContainer} edges={['top']}>
          <View style={styles.termsModalHeader}>
            <TouchableOpacity onPress={() => setTermsModalVisible(false)} style={styles.termsModalBackButton}>
              <Ionicons name="close" size={24} color="#1E2532" />
            </TouchableOpacity>
            <Text style={styles.termsModalTitle}>Termos de Teleatendimento</Text>
          </View>
          <ScrollView style={styles.termsScrollView} contentContainerStyle={styles.termsContent}>
            <Text style={styles.termsText}>
              Para proteger cada etapa da sua jornada, solicitamos seu CPF por 3 motivos muito importantes:{'\n\n'}
              1. Validar sua identidade com segurança durante consultas e procedimentos médicos.{'\n'}
              2. Garantir transparência na emissão de notas fiscais para exames, medicamentos e serviços.{'\n'}
              3. Assegurar a integridade das transações e dos seus dados pessoais.{'\n\n'}
              Assim, mantemos um ambiente confiável e transparente para você e toda nossa comunidade.{'\n\n'}
              Fique tranquilo(a)! Seus dados são protegidos com os mais altos padrões de segurança, e usaremos essas informações apenas para seu benefício.
            </Text>
            <Text style={styles.termsAgreement}>
              Ao continuar você concorda com os Termos de atendimento da Telemedicina
            </Text>
          </ScrollView>
          <View style={styles.termsFooter}>
            <TouchableOpacity style={styles.agreeButton} onPress={handleAgreeTerms}>
              <Text style={styles.agreeButtonText}>Concordo com os termos</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppointmentCard item={item} />

        <View style={styles.reminderCard}>
          <View style={styles.reminderHeader}>
            <Ionicons name="calendar-outline" size={20} color="#4A5463" />
            <Text style={styles.reminderTitle}>Data do Atendimento</Text>
          </View>
          <Text style={styles.reminderDate}>{item.date}</Text>
          <View style={styles.reminderOption}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setReminderEnabled(!reminderEnabled)}
            >
              <View style={[styles.checkbox, reminderEnabled && styles.checkboxChecked]}>
                {reminderEnabled && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
            <Text style={styles.reminderText}>Lembrar 15 min antes</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Código da Sala</Text>
          <View style={styles.codeContainer}>
            <View style={styles.codeRow}>
              <Text style={styles.codeText}>{formatRoomCode(item.codigoAtendimento)}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => copyToClipboard(formatRoomCode(item.codigoAtendimento))}
              >
                <Ionicons name="copy-outline" size={20} color="#4576F2" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.roomInfoText}>
            A sala estará disponível 10 minutos antes do início do atendimento.
          </Text>
        </View>

        {/* Seção de Pagamentos */}

        <View style={styles.paymentsCard}>
          <Text style={styles.sectionTitle}>Pagamentos</Text>
          {/* Card de Valor */}
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Valor do Atendimento</Text>
            <Text style={styles.paymentValue}>R$ {item.valorAtendimento.toFixed(2).replace('.', ',')}</Text>
          </View>

          {/* Card de Método de Pagamento */}
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Método de Pagamento</Text>
            <Text style={styles.paymentValue}>
              {item.metodoPagamento === 'pix' ? 'PIX' :
               item.metodoPagamento === 'dinheiro' ? 'Dinheiro' :
               item.metodoPagamento === 'cartao_credito' ? `Cartão de Crédito **** ${item.numeroCartao}` :
               item.metodoPagamento}
            </Text>
          </View>

          {/* Card de Parcelas (apenas se parcelado) */}
          {item.parcelado && (
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Parcelamento</Text>
              <Text style={styles.paymentValue}>
                {item.numeroParcelas}x de R$ {(item.valorParcela || 0).toFixed(2).replace('.', ',')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer com botão de reagendar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.rescheduleButton} onPress={handleEnterRoom}>
          <Text style={styles.rescheduleButtonText}>Entrar na Sala de Atendimento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  scrollContent: { padding: 16 },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leftColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  date: {
    fontSize: 12,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  time: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Intelo-Bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 8,
  },
  bottomSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  type: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo',
  },
  description: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Intelo-Bold',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    flex: 1,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5EAF0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
    marginLeft: 8,
  },
  rescheduleButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  rescheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
    marginLeft: 8,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  codeContainer: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  codeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  dateCardTitle: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  dateCardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  timeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  timeCardTitle: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  commentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  commentSection: {
    marginBottom: 16,
  },
  commentTitle: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo',
    lineHeight: 20,
  },
  documentsText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo',
    marginBottom: 12,
  },
  viewDocumentsButton: {
    backgroundColor: '#4576F2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  viewDocumentsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
  paymentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginLeft: 8,
  },
  reminderDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
  },
  reminderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4576F2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#4576F2',
  },
  reminderText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  copyButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 12,
  },
  roomInfoText: {
    fontSize: 12,
    color: '#4A5463',
    fontFamily: 'Intelo',
    lineHeight: 16,
  },
  optionsButton: {
    padding: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: { flex: 1, backgroundColor: '#EFF1F5' },
  modalHeader: {
    height: 60,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  modalBackButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  menuButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButtonText: {
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 12,
  },
  cancelMenuButton: {
    backgroundColor: '#FFF5F5',
  },
  cancelMenuButtonText: {
    color: '#FF7A7A',
  },
  cancelModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  cancelModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'left',
    marginBottom: 16,
  },
  cancelModalText: {
    fontSize: 14,
    color: '#4A5463',
    fontFamily: 'Intelo',
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 24,
  },
  cancelModalButtons: {
    flexDirection: 'column',
    width: '100%',
    gap: 12,
  },
  cancelModalBackButton: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: 280,
    minHeight: 56,
  },
  cancelModalBackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF7A7A',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
  },
  cancelModalConfirmButton: {
    backgroundColor: '#FF7A7A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: 280,
    minHeight: 56,
  },
  cancelModalConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF5F5',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
  },
  termsModalContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  termsModalHeader: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  termsModalBackButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  termsScrollView: {
    flex: 1,
    backgroundColor: '#EFF1F5',
  },
  termsContent: {
    padding: 16,
  },
  termsText: {
    fontSize: 16,
    color: '#1E2532',
    fontFamily: 'Intelo',
    lineHeight: 20,
  },
  termsAgreement: {
    fontSize: 12,
    color: '#6B7480',
    fontFamily: 'Intelo',
    marginTop: 16,
    textAlign: 'center',
  },
  termsFooter: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5EAF0',
  },
  agreeButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  agreeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
});