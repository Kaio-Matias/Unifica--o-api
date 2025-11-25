import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoricoCard from '../../../../components/historico/HistoricoCard';
import { mockHistoricoData } from '../../../../components/historico/HistoricoData';

export default function HistoricoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = mockHistoricoData.find(h => h.id === id);

  if (!item) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" onPress={() => router.back()} />
          <Text style={styles.title}>Detalhes do Atendimento</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Atendimento não encontrado.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#1E2532" onPress={() => router.back()} />
        <Text style={styles.title}>Detalhes do Atendimento</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HistoricoCard item={item} />
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Código de Atendimento</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{item.codigoAtendimento}</Text>
          </View>
        </View>
        
        <View style={styles.dateCard}>
          <Text style={styles.dateCardTitle}>Data do Atendimento</Text>
          <Text style={styles.dateCardValue}>{item.data}</Text>
        </View>
        
        <View style={styles.timeCard}>
          <Text style={styles.timeCardTitle}>Horário e Duração</Text>
          <View style={styles.timeContainer}>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Horário de Início</Text>
              <Text style={styles.timeValue}>{item.hora}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Duração</Text>
              <Text style={styles.timeValue}>{item.duracao}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.commentsCard}>
          <View style={styles.commentSection}>
            <Text style={styles.commentTitle}>Comentário do Profissional</Text>
            <Text style={styles.commentText}>{item.comentarioProfissional}</Text>
          </View>
          
          <View style={styles.separator} />
          
          <View style={styles.commentSection}>
            {item.comentarioAdicional && (
              <>
                <Text style={styles.commentTitle}>Comentário Adicional</Text>
                <Text style={styles.commentText}>{item.comentarioAdicional}</Text>
                <View style={styles.separator} />
              </>
            )}
            
            <Text style={styles.documentsText}>
              Há {item.documentosDisponiveis.toString().padStart(2, '0')} documentos disponíveis neste Atendimento
            </Text>
            <TouchableOpacity
              style={styles.viewDocumentsButton}
              onPress={() => router.push(`/minha-saude/historico/documentos/${id}`)}
            >
              <Text style={styles.viewDocumentsText}>Ver documentos disponíveis</Text>
            </TouchableOpacity>
          </View>
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
        <TouchableOpacity 
          style={styles.rescheduleButton}
          onPress={() => router.push(`/minha-saude/MeusAgendamentos/reagendar?id=${id}`)}
        >
          <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
          <Text style={styles.rescheduleButtonText}>Agendar Retorno</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  dateCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 8,
  },
  dateCardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  timeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  timeCardTitle: {
    fontSize: 14,
    fontWeight: '600',
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
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6B7480',
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
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  commentSection: {
    marginBottom: 8,
  },
  commentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    lineHeight: 20,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5EAF0',
    marginVertical: 12,
  },
  documentsText: {
    fontSize: 12,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  viewDocumentsButton: {
    backgroundColor: '#D2DDF8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  viewDocumentsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4576F2',
    fontFamily: 'Intelo-Bold',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  codeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
    marginTop: 8,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
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
    width: 120,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    flex: 1,
  },
  paymentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  paymentItem: {
    marginBottom: 16,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5463',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5EAF0',
  },
  rescheduleButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
    marginLeft: 8,
  },
});