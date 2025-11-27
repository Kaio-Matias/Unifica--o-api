import express from 'express';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Fail Fast: Valida variáveis críticas
const REQUIRED_ENVS = ['DB_HOST', 'DB_USERNAME', 'DB_PASS', 'DB_DATABASE', 'APP_SECRET'];
const missing = REQUIRED_ENVS.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ [Teleconsulta API] Erro Fatal: Variáveis de ambiente faltando: ${missing.join(', ')}`);
  // process.exit(1); // Recomendado em produção
}

export const app = express();

export function server() {
  useExpressApp(app);
  
  dataSource
    .initialize()
    .then(() => {
      // Porta 3002 para evitar conflito com BFF (3333) e Users (3001)
      const PORT = parseInt(process.env.PORT_API || '3002');
      
      app.listen(PORT, () => {
        console.log(`✅ [Teleconsulta API] Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('❌ Erro ao conectar no Banco de Dados:', error);
    });
}