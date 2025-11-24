import { Stack } from 'expo-router';
import React from 'react';
import { RegisterProvider } from '../../lib/context/RegisterContext';

export default function PacientLayout() {
  // Envolve o Stack com o provedor de contexto do registro
  return (
    <RegisterProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RegisterProvider>
  );
}