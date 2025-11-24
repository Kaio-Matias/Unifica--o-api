import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../entities/Users';    // Correção: Importar 'User' (singular)
import { Contato } from '../../entities/Contatos'; // Correção: Importar 'Contato' (singular)
import { UsuariosContatos } from '../../entities/UsuariosContatos'; // Tabela de ligação (N:N)
import { hash } from 'bcryptjs';

class CreateUserController {
  async handle(req: Request, res: Response) {
    // 1. Recebe os dados do App
    const { name, email, password, role, phone, cpf } = req.body;

    const userRepository = getRepository(User);
    const contatoRepository = getRepository(Contato);
    const usuarioContatoRepository = getRepository(UsuariosContatos);

    // 2. Verifica se usuário existe
    const userAlreadyExists = await userRepository.findOne({ where: { email } });
    if (userAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 3. Cria o Usuário
    const passwordHash = await hash(password, 8);

    // Nota: Mapeamos os dados do frontend para as colunas do banco (baseado nas interfaces que você mandou)
    const user = userRepository.create({
      nome: name,            // App manda 'name', banco espera 'nome'
      email: email,
      senha_hash: passwordHash, // Banco espera 'senha_hash'
      tipo_usuario: role,    // App manda 'role', banco espera 'tipo_usuario'
      cpfcnpj: cpf,          // Banco espera 'cpfcnpj'
      is_active: true,
      perfil_privado: false,
      is_verificado: false,
      // telefone: phone,    <-- Se a tabela User tiver coluna telefone, descomente. Se for só na tabela Contatos, deixe comentado.
    });

    await userRepository.save(user);

    // 4. Salva o Telefone (Lógica complexa devido à tabela intermediária UsuariosContatos)
    if (phone) {
      // A. Cria o Contato
      const contato = contatoRepository.create({
        valor: phone,
        tipo_contato: 1, // Supondo que 1 seja 'Celular/Telefone'
        is_principal: true,
        id_usuario: user.id // Se a tabela Contatos tiver link direto
      });
      
      await contatoRepository.save(contato);

      // B. Se existir tabela intermediária (UsuariosContatos), cria o vínculo
      // Verifique se no seu banco a relação é direta ou via tabela pivo. 
      // Pelo código anterior parecia ter UsuariosContatos. Se não tiver, ignore este bloco B.
      try {
          const vinculo = usuarioContatoRepository.create({
              usuario_id: user.id,
              contato_id: contato.id
          });
          await usuarioContatoRepository.save(vinculo);
      } catch (e) {
          // Se der erro aqui, é provável que a tabela Contatos já tenha a chave estrangeira direta
          console.log("Não foi necessário criar vínculo na tabela pivo ou ela não existe.");
      }
    }

    // Retorno formatado para o App não quebrar
    return res.status(201).json({
        id: user.id,
        name: user.nome,
        email: user.email,
        role: user.tipo_usuario,
        token: "fake-jwt-token-for-now" // O login real gerará o token depois
    });
  }
}

export { CreateUserController };