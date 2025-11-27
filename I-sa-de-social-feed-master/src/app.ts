import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';
import { ConversaService } from './app/services/Conversa';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Validação de ambiente
const REQUIRED_ENVS = ['DB_HOST', 'DB_USERNAME', 'DB_PASS', 'DB_DATABASE', 'APP_SECRET'];
const missing = REQUIRED_ENVS.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ [Social API] Erro Fatal: Variáveis de ambiente faltando: ${missing.join(', ')}`);
}

export const app = express();

export function server() {
  const httpServer = createServer(app);
  
  // Configuração do Socket.IO com CORS permissivo (ajuste conforme prod)
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*', 
      methods: ["GET", "POST"]
    },
  });

  useExpressApp(app);

  // Inicializa o banco ANTES de aceitar conexões ou instanciar serviços dependentes
  dataSource
    .initialize()
    .then(() => {
      console.log('✅ [Social API] Banco de Dados Conectado');

      // Instancia o serviço apenas após o banco estar pronto
      const conversaService = new ConversaService();

      // --- Lógica do Socket.IO ---
      io.on('connection', (socket) => {
        console.log(`🔌 Socket Conectado: ${socket.id}`);

        socket.on('usuario:entrar', (userId: number) => {
          if (userId) {
            socket.join(userId.toString());
            console.log(`👤 Usuário ${userId} entrou na sala pessoal`);
          }
        });

        socket.on('mensagem:enviar', async (data) => {
          const { remetente_id, destinatario_id, mensagem } = data;
          
          if(!remetente_id || !destinatario_id || !mensagem) {
             socket.emit('erro', { mensagem: 'Dados incompletos para envio.' });
             return;
          }

          try {
            const nova = await conversaService.createConversa({
              remetente_id,
              destinatario_id,
              mensagem,
            });

            // Emite para os dois envolvidos
            io.to(remetente_id.toString()).emit('mensagem:nova', nova);
            io.to(destinatario_id.toString()).emit('mensagem:nova', nova);
          } catch (err) {
            console.error('Erro ao salvar mensagem:', err);
            socket.emit('erro', { mensagem: 'Erro ao processar mensagem.' });
          }
        });

        socket.on('mensagem:listar', async ({ remetente_id, destinatario_id }) => {
          try {
            const historico = await conversaService.getConversas({
              queries: {
                where: [
                  { remetente_id, destinatario_id },
                  { remetente_id: destinatario_id, destinatario_id: remetente_id },
                ],
                order: { dt_envio: 'ASC' },
              },
            });
            socket.emit('mensagem:historico', historico);
          } catch (err) {
            console.error('Erro ao buscar histórico:', err);
            socket.emit('erro', { mensagem: 'Erro ao recuperar histórico.' });
          }
        });
        
        socket.on('disconnect', () => {
            console.log(`🔌 Socket Desconectado: ${socket.id}`);
        });
      });

      // Inicia o servidor HTTP
      const PORT = parseInt(process.env.PORT_API || '3003'); // Porta 3003 para Social
      httpServer.listen(PORT, () => {
        console.log(`✅ [Social API] Servidor rodando na porta ${PORT} (HTTP + Socket.IO)`);
      });

    })
    .catch((error) => {
      console.error('❌ Erro fatal ao iniciar conexão com banco:', error);
    });
}