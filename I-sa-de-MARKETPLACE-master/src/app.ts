import express from 'express';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Validação Fail Fast
const REQUIRED_ENVS = ['DB_HOST', 'DB_USERNAME', 'DB_PASS', 'DB_DATABASE', 'APP_SECRET'];
const missing = REQUIRED_ENVS.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ [Marketplace API] Erro Fatal: Variáveis de ambiente faltando: ${missing.join(', ')}`);
}

export const app = express();

export function server() {
  useExpressApp(app);
  
  dataSource
    .initialize()
    .then(() => {
      // Porta 3004 para o Marketplace
      const PORT = parseInt(process.env.PORT_API || '3004');
      
      app.listen(PORT, () => {
        console.log(`✅ [Marketplace API] Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('❌ Erro crítico ao conectar no Banco de Dados:', error);
    });
}