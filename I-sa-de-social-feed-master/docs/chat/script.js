const socket = io('http://localhost'); // altere para seu IP/host se necessário

let userId = null;
let destId = null;

function entrar() {
  userId = parseInt(document.getElementById('userId').value);
  destId = parseInt(document.getElementById('destId').value);

  console.log(`Entrando no chat como usuário ${userId} e destinando mensagens para ${destId}`);

  if (!userId || !destId) {
    alert('Informe seu ID e o ID do destinatário.');
    return;
  }

  socket.emit('usuario:entrar', userId);
  document.getElementById('chat').classList.remove('hidden');

  // Buscar histórico
  socket.emit('mensagem:listar', { remetente_id: userId, destinatario_id: destId });

  socket.on('mensagem:historico', (mensagens) => {
    mensagens.forEach(msg => renderMensagem(msg));
  });

  socket.on('mensagem:nova', (msg) => {
    if (
      (msg.remetente_id === userId && msg.destinatario_id === destId) ||
      (msg.remetente_id === destId && msg.destinatario_id === userId)
    ) {
      renderMensagem(msg);
    }
  });

  socket.on('erro', (e) => {
    alert(e.mensagem);
  });
}

function enviarMensagem() {
  const input = document.getElementById('msgInput');
  const mensagem = input.value.trim();
  if (!mensagem) return;

  console.log(`Enviando mensagem: "${mensagem}" de ${userId} para ${destId}`);

  socket.emit('mensagem:enviar', {
    remetente_id: userId,
    destinatario_id: destId,
    mensagem
  });

  input.value = '';
}

function renderMensagem({ remetente_id, mensagem }) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.classList.add(remetente_id === userId ? 'from-me' : 'from-other');
  div.textContent = mensagem;

  const container = document.getElementById('messages');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
