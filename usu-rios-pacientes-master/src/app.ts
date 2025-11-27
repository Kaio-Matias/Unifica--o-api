import express from 'express';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';
import { redisClient } from './app/Redis/clientRedis';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

// Validação fail-fast das variáveis
const REQUIRED_ENVS = ['DB_HOST', 'DB_USERNAME', 'DB_PASS', 'DB_DATABASE', 'APP_SECRET', 'FIREBASE_PROJECT_ID'];
const missing = REQUIRED_ENVS.filter(key => !process.env[key]);

if (missing.length > 0) {
    console.error(`❌ [Users API] Erro Fatal: Variáveis de ambiente faltando: ${missing.join(', ')}`);
    // Não dar exit(1) aqui se quiser que ele tente rodar mesmo assim, mas é arriscado.
}

export const app = express();

export async function server() {
  useExpressApp(app);

  // Conexão com Redis
  try {
      await redisClient.connect();
      console.log('✅ Redis conectado com sucesso');
  } catch (err) {
      console.error('❌ Erro ao conectar no Redis:', err);
  }

  // Conexão com Banco e Start
  dataSource
    .initialize()
    .then(() => {
      const PORT = parseInt(process.env.PORT_API || '3001'); // Porta 3001 para não conflitar com BFF
      app.listen(PORT, () => {
        console.log(`✅ [Users API] Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('❌ Erro ao inicializar Data Source:', error);
    });
}