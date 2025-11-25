import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type PaymentMethod = 'debit' | 'credit' | 'pix' | 'googlepay' | 'applepay' | 'paypal';

export const Step5 = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const paymentMethods = [
    {
      id: 'debit' as PaymentMethod,
      icon: 'card-outline',
      iconColor: '#FF6B6B',
      title: 'Cartão de Débito',
      subtitle: '',
    },
    {
      id: 'credit' as PaymentMethod,
      icon: 'card-outline',
      iconColor: '#4576F2',
      title: 'Cartão de Crédito',
      subtitle: 'Até 2x sem juros',
    },
    {
      id: 'pix' as PaymentMethod,
      icon: 'cash-outline',
      iconColor: '#00C2A0',
      title: 'Pix',
      subtitle: 'Aprovação imediata',
    },
    {
      id: 'googlepay' as PaymentMethod,
      icon: 'logo-google',
      iconColor: '#4285F4',
      title: 'Google Pay',
      subtitle: '',
    },
    {
      id: 'applepay' as PaymentMethod,
      icon: 'logo-apple',
      iconColor: '#000000',
      title: 'Apple Pay',
      subtitle: '',
    },
    {
      id: 'paypal' as PaymentMethod,
      icon: 'logo-paypal',
      iconColor: '#003087',
      title: 'PayPal',
      subtitle: '',
    },
  ];

  return (
    <View style={styles.stepContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Como você deseja pagar?</Text>
        <Text style={styles.subtitle}>Escolha o método de pagamento para confirmar sua consulta.</Text>
      </View>

      <View style={styles.methodsList}>
        {paymentMethods.map((method) => (
          <Pressable
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.methodCardSelected,
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <View style={[styles.iconContainer, { backgroundColor: `${method.iconColor}15` }]}>
                <Ionicons name={method.icon as any} size={24} color={method.iconColor} />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                {method.subtitle ? (
                  <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
                ) : null}
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Intelo',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Intelo',
  },
  methodsList: {
    padding: 20,
    gap: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  methodCardSelected: {
    borderColor: '#4576F2',
    borderWidth: 2,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    gap: 2,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  methodSubtitle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Intelo',
  },
});
