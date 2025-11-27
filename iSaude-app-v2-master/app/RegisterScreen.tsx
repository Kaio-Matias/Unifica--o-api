import React, { createContext, useContext, useState } from 'react';
import { api } from '../api';

// Tipagens para organizar os dados
interface RegistrationData {
  userType: 'pacient' | 'professional' | 'clinic';
  // Agrupa os dados das várias etapas do seu wizard
  basicInfo: { email?: string; telefone?: string; password?: string; confirmPassword?: string };
  personalInfo: { nome?: string; cpf?: string; dataNascimento?: string; sexo?: string; cnpj?: string };
  addressInfo: { cep?: string; rua?: string; numero?: string; bairro?: string; cidade?: string; estado?: string };
  // Dados específicos
  professionalInfo?: { areaAtuacao?: string; numeroRegistro?: string; uf?: string; especialidade?: string; sobre?: string };
  clinicInfo?: { nomeFantasia?: string; nomeResponsavel?: string; tipoUnidade?: string };
}

interface RegisterContextType {
  data: RegistrationData;
  updateData: (section: keyof RegistrationData, value: any) => void;
  submitRegistration: () => Promise<any>; // Retorna a resposta da API
  loading: boolean;
}

const RegisterContext = createContext<RegisterContextType>({} as RegisterContextType);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RegistrationData>({
    userType: 'pacient', // Valor inicial padrão
    basicInfo: {},
    personalInfo: {},
    addressInfo: {},
  });
  const [loading, setLoading] = useState(false);

  // Função para atualizar partes do estado conforme o usuário avança nas telas
  const updateData = (section: keyof RegistrationData, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...value }, // Merge dos dados
    }));
  };

  // Função final que envia para o BFF
  const submitRegistration = async () => {
    setLoading(true);
    try {
      console.log('Iniciando registro...', data);

      // 1. Monta o Payload de Orquestração para o BFF
      const payload = {
        // Dados do Usuário Base
        nome: data.personalInfo.nome || data.clinicInfo?.nomeFantasia,
        email: data.basicInfo.email,
        password: data.basicInfo.password,
        telefone: data.basicInfo.telefone,
        cpf: data.personalInfo.cpf, // Opcional para clínica
        user_type: data.userType,   // CRUCIAL: Define o fluxo no Backend

        // Dados Específicos injetados no mesmo nível (Flat Object) para o BFF processar
        ...(data.userType === 'professional' && {
          area_atuacao: data.professionalInfo?.areaAtuacao,
          numero_registro: data.professionalInfo?.numeroRegistro,
          estado_atuacao: data.professionalInfo?.uf,
          especialidade: data.professionalInfo?.especialidade,
          sobre: data.professionalInfo?.sobre,
        }),

        ...(data.userType === 'clinic' && {
          cnpj: data.personalInfo.cnpj,
          nome_fantasia: data.clinicInfo?.nomeFantasia,
          nome_responsavel: data.clinicInfo?.nomeResponsavel,
          tipo_unidade: data.clinicInfo?.tipoUnidade,
          // Dados do responsável (se a UI coletar separado, mapear aqui)
          cpf_responsavel: data.personalInfo.cpf, 
          email_responsavel: data.basicInfo.email,
        })
      };

      // 2. Envia para a API
      const response = await api.post('/users', payload);
      
      return response.data;

    } catch (error: any) {
      console.error('Erro no Contexto de Registro:', error.response?.data || error.message);
      throw error; // Lança o erro para a tela tratar visualmente
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContext.Provider value={{ data, updateData, submitRegistration, loading }}>
      {children}
    </RegisterContext.Provider>
  );
}

export const useRegister = () => useContext(RegisterContext);