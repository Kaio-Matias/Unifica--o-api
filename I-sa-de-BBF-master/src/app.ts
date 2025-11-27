import express from 'express';
import { useExpressApp } from './useApp';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente baseado no NODE_ENV
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Lista de variáveis críticas para o BFF funcionar
const REQUIRED_ENVS = [
  'APP_URL_USER',
  'APP_URL_TELECONSULTA',
  'APP_URL_MARKETPLACE',
  'APP_URL_SOCIAL_MIDIA',
  'APP_SECRET_USER',
  'APP_SECRET'
];

// Validação "Fail Fast"
const missingEnvs = REQUIRED_ENVS.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  console.error('❌ [FATAL ERROR] Variáveis de ambiente obrigatórias faltando:');
  console.error(missingEnvs.join(', '));
  process.exit(1); // Encerra a aplicação imediatamente com erro
}

export const app = express();

export async function server() {
  useExpressApp(app);
  
  // Porta padrão 3333 se não definida, pois porta 80 requer root
  const PORT = parseInt(process.env.PORT_API || '3333'); 

  app.listen(PORT, () => {
    console.log(`✅ Servidor BFF rodando na porta ${PORT}`);
    console.log(`📡 Conectado aos serviços:`);
    console.log(`   - User: ${process.env.APP_URL_USER}`);
    console.log(`   - Teleconsulta: ${process.env.APP_URL_TELECONSULTA}`);
    console.log(`   - Marketplace: ${process.env.APP_URL_MARKETPLACE}`);
    console.log(`   - Social: ${process.env.APP_URL_SOCIAL_MIDIA}`);
  });
}