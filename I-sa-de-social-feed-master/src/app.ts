import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';
import { ConversaService } from './app/services/Conversa';

export const app = express();

export function server() {
  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const conversaService = new ConversaService();

  io.on('connection', (socket) => {
    console.log(`Conectado: ${socket.id}`);

    // Evento 1: Entrar na sala do usuário
    socket.on('usuario:entrar', (userId: number) => {
      socket.join(userId.toString());
      console.log(`Usuário ${userId} entrou na sala`);
    });

    // Evento 2: Criar/enviar mensagem
    socket.on('mensagem:enviar', async (data) => {
      const { remetente_id, destinatario_id, mensagem } = data;

      try {
        const nova = await conversaService.createConversa({
          remetente_id,
          destinatario_id,
          mensagem,
        });

        // Enviar a mensagem para remetente e destinatário
        io.to(remetente_id.toString()).emit('mensagem:nova', nova);
        io.to(destinatario_id.toString()).emit('mensagem:nova', nova);
      } catch (err) {
        console.error('Erro ao salvar mensagem:', err);
        socket.emit('erro', { mensagem: 'Erro ao salvar mensagem' });
      }
    });

    // Evento 3: Listar conversa entre dois usuários
    socket.on('mensagem:listar', async ({ remetente_id, destinatario_id }) => {
      try {
        console.log(`Listando conversa entre ${remetente_id} e ${destinatario_id}`);
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
        console.error('Erro ao buscar mensagens:', err);
        socket.emit('erro', { mensagem: 'Erro ao buscar mensagens' });
      }
    });
  });

  useExpressApp(app);
  dataSource
    .initialize()
    .then(() => {
      httpServer.listen(parseInt(process.env.PORT_API) || 80, () => {
        console.log('Servidor rodando na porta 80');
      });
    })
    .catch((error) => {
      console.error('Erro ao iniciar o banco:', error);
    });
}
