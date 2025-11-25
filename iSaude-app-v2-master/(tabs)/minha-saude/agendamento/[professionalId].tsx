import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stepper } from '../../../../components/agendamento/Stepper';
import * as ClinicConsultationSteps from '../../../../components/agendamento/steps/clinic-consultation';
import * as ClinicFullSteps from '../../../../components/agendamento/steps/clinic-full';
import * as ProfessionalSteps from '../../../../components/agendamento/steps/professional';

export default function AgendamentoScreen() {
  const { professionalId } = useLocalSearchParams();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'consulta' | 'exame' | null>(null);

  // Mock professional data - in production, fetch based on professionalId
  const professionalsData: Record<string, any> = {
    '1': {
      id: 1,
      name: "Dra. Maria Glendeswalter",
      clinic: "Clínica Geral",
      verified: true,
      profileType: "professional",
      services: [
        { id: 1, name: 'Teleconsulta', description: 'Atendimento em Video Chamada', price: 49.90 },
        { id: 2, name: 'Consulta Presencial', description: 'Endereço', price: 99.90 },
        { id: 3, name: 'Retorno Presencial', description: 'Endereço', price: 50.90 },
      ],
    },
    '2': {
      id: 2,
      name: "Dra. Maria Glenda",
      clinic: "Clínica Geral",
      verified: true,
      profileType: "clinic-consultation",
      services: [
        { id: 1, name: 'Teleconsulta', description: 'Consulta online via videochamada', price: 99.90 },
        { id: 2, name: 'Consulta Presencial', description: 'Atendimento no consultório', price: 199.90 },
        { id: 3, name: 'Check-up Completo', description: 'Avaliação médica completa', price: 350.00 },
      ],
    },
    '3': {
      id: 3,
      name: "Dr. João Silva",
      clinic: "Cardiologia Viva",
      verified: false,
      profileType: "clinic-full",
      serviceCategories: [
        {
          id: 'consulta',
          name: 'Consulta',
          services: [
            { id: 1, name: 'Consulta Cardiológica', description: 'Consulta presencial completa', price: 150 },
          ]
        },
        {
          id: 'exame',
          name: 'Exame',
          services: [
            { id: 2, name: 'Eletrocardiograma', description: 'Exame de ECG', price: 80 },
            { id: 3, name: 'Ecocardiograma', description: 'Ultrassom do coração', price: 250 },
          ]
        }
      ],
    },
    '4': {
      id: 4,
      name: "Dra. Ana Paula",
      clinic: "Saúde da Mulher",
      verified: true,
      profileType: "professional",
      services: [
        { id: 1, name: 'Teleconsulta', description: 'Consulta online', price: 120.5 },
        { id: 2, name: 'Consulta Ginecológica', description: 'Consulta presencial', price: 150 },
        { id: 3, name: 'Pré-natal', description: 'Acompanhamento gestacional', price: 180 },
      ],
    },
  };

  const professional = professionalsData[professionalId as string] || professionalsData['1'];
  const profileType = professional.profileType || 'professional';
  
  // Definir currentStep inicial baseado no profileType
  const initialStep = profileType === 'professional' ? 2 : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);
  
  // Define totalSteps baseado no profileType
  const totalSteps = profileType === 'clinic-full' && selectedCategory === 'exame' ? 6 : 5;

  const renderStepContent = () => {
    // Renderizar steps baseado no profileType
    switch (profileType) {
      case 'professional':
        return renderProfessionalSteps();
      
      case 'clinic-full':
        return renderClinicFullSteps();
      
      case 'clinic-consultation':
        return renderClinicConsultationSteps();
      
      default:
        return renderProfessionalSteps();
    }
  };

  const renderProfessionalSteps = () => {
    switch (currentStep) {
      case 1:
        return <ProfessionalSteps.Step1 />;

      case 2:
        return (
          <ProfessionalSteps.Step2 
            professional={professional}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        );

      case 3:
        return <ProfessionalSteps.Step3 />;

      case 4:
        return <ProfessionalSteps.Step4 />;

      case 5:
        return <ProfessionalSteps.Step5 />;

      default:
        return null;
    }
  };

  const renderClinicFullSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClinicFullSteps.Step1 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        );

      case 2:
        return (
          <ClinicFullSteps.Step2 
            professional={professional}
            selectedCategory={selectedCategory}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        );

      case 3:
        return <ClinicFullSteps.Step3 />;

      case 4:
        return <ClinicFullSteps.Step4 />;

      case 5:
        return <ClinicFullSteps.Step5 />;

      case 6:
        // Step 6 apenas para exames
        if (selectedCategory === 'exame') {
          return <ClinicFullSteps.Step6 />;
        }
        return null;

      default:
        return null;
    }
  };

  const renderClinicConsultationSteps = () => {
    switch (currentStep) {
      case 1:
        return <ClinicConsultationSteps.Step1 />;

      case 2:
        return (
          <ClinicConsultationSteps.Step2 
            professional={professional}
            selectedService={selectedService}
            onSelectService={setSelectedService}
          />
        );

      case 3:
        return <ClinicConsultationSteps.Step3 />;

      case 4:
        return <ClinicConsultationSteps.Step4 />;

      case 5:
        return <ClinicConsultationSteps.Step5 />;

      default:
        return null;
    }
  };

  const handleBack = () => {
    if (currentStep > 2) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </Pressable>
          <Text style={styles.headerTitle}>Agendamento</Text>
        </View>
      </View>

      {/* Stepper */}
      <Stepper currentStep={currentStep} totalSteps={totalSteps} />

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Pressable
          style={styles.nextButton}
          onPress={() => {
            if (currentStep < totalSteps) {
              setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
            } else {
              // Step 5 - Processar pagamento e navegar para tela de conclusão
              router.push('/(tabs)/minha-saude/agendamento/concluido');
            }
          }}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps ? 'Pagar Agora' : 'Continuar'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Intelo',
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  nextButton: {
    backgroundColor: '#01AEA4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo',
  },
});
