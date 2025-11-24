import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a interface para os dados do formulário
interface IRegisterForm {
  // Adicione todos os campos de todas as etapas aqui
  // Etapa 1: PersonalInformation
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  // Etapa 2: BasicInformation
  dt_nascimento?: string;
  sexo?: string;
  // Etapa 3: UserInformation
  // (Esta tela parece não coletar dados, apenas confirma)
  // Etapa 4: PasswordInformation
  password?: string;
  // Tipo de usuário fixo para este fluxo
  user_type: 'pacient';
}

// Define a interface para o contexto
interface IRegisterContext {
  formData: IRegisterForm;
  updateFormData: (data: Partial<IRegisterForm>) => void;
  resetFormData: () => void;
}

// Estado inicial
const initialState: IRegisterForm = {
  user_type: 'pacient',
};

// Cria o contexto
const RegisterContext = createContext<IRegisterContext | undefined>(undefined);

// Cria o Provedor do Contexto
export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<IRegisterForm>(initialState);

  const updateFormData = (data: Partial<IRegisterForm>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  
  const resetFormData = () => {
    setFormData(initialState);
  };

  return (
    <RegisterContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </RegisterContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error('useRegister deve ser usado dentro de um RegisterProvider');
  }
  return context;
};
