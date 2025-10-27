import { DataSource } from 'typeorm';
import {
  Comentario,
  Conversa,
  Curtida,
  Endereco,
  Farmacia,
  Localizacao,
  Notificacao,
  Postagem,
  ProfissionalDetalhes,
  Salvamento,
  Seguidor,
  UnidadeSaude,
  ModuloTrilha,
  Trilha,
  Certificado,
  Aula,
  InscricaoTrilha,
  ProgressoAula,
  QuestaoQuiz,
  Quiz,
  RespostaUsuario,
  CategoriaPostagem
} from '../app/entities';

import { profissionaisDetalhes1693428187261 } from './migrations/2025-04-28_10-39-01_create_profissionais_detalhes';
import { unidadesSaude1693428187262 } from './migrations/2025-04-28_10-39-01_create_unidades_saude';
import { farmacias1693428187263 } from './migrations/2025-04-28_10-38-00_create_farmacias';
import { enderecos1693428187265 } from './migrations/2025-04-28_10-39-00_create_enderecos';
import { localizacao1693428187266 } from './migrations/2025-04-28_10-39-00_create_localizacao';
import { postagens1693428187270 } from './migrations/2025-04-28_10-39-06_create_postagens';
import { comentarios1693428187272 } from './migrations/2025-04-28_10-39-07_create_comentarios';
import { conversas1693428187276 } from './migrations/2025-04-28_10-39-00_create_conversas';
import { curtidas1693428187271 } from './migrations/2025-04-28_10-39-07_create_curtidas';
import { notificacoes1693428187275 } from './migrations/2025-04-28_10-39-00_create_notificacoes';
import { salvamentos1693428187274 } from './migrations/2025-04-28_10-39-07_create_salvar';
import { seguidores1693428187273 } from './migrations/2025-04-28_10-39-07_create_seguidores';
import { categoriasPostagens1693431234567 } from './migrations/2025-04-28_10-39-00_create_category_posts';

import { CreateTrilhasTable1693428187273 } from './migrations/2025-04-28_10-39-00_create_trilha';
import { CreateAulasTable1693428187273 } from './migrations/2025-04-28_10-39-10_create_aula_trilha';
import { CreateCertificadosTable1693428187273 } from './migrations/2025-04-28_10-39-09_create_certificados';
import { CreateInscricoesTrilhaTable1693428187273 } from './migrations/2025-04-28_10-39-02_create_inscricoes_trilha';
import { CreateModulosTrilhaTable1693428187273 } from './migrations/2025-04-28_10-39-01_create_modulos_trilha';
import { CreateProgressoAulaTable1693428187273 } from './migrations/2025-04-28_10-39-09_create_progresso_aula';
import { CreateQuizzesTable1693428187273 } from './migrations/2025-04-28_10-39-09_create_quizzes';
import { CreateQuestoesQuizTable1693428187273 } from './migrations/2025-04-28_10-39-10_create_questoes_quiz';
import { CreateRespostasUsuariosTable1693428187273 } from './migrations/2025-04-28_10-39-10_create_respostas_usuarios';

import { AddEnderecoIdToUnidadesSaude1693428187273 } from './migrations/2025-04-28_10-39-11_add_enderecoid_unidadesaude';
import { AddEnderecoIdToFarmacias1693428187273 } from './migrations/2025-04-28_10-39-11_add_enderecoid_farmacias';
import { AddRelacionamentosEnderecoFarmaciaUnidade1693428187273 } from './migrations/2025-04-28_10-39-11_add_relations_in_enderecos';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.BD_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Comentario,
    Conversa,
    Curtida,
    Endereco,
    Farmacia,
    Localizacao,
    Notificacao,
    CategoriaPostagem,
    Postagem,
    ProfissionalDetalhes,
    Salvamento,
    Seguidor,
    UnidadeSaude,
    ModuloTrilha,
    Trilha,
    Certificado,
    Aula,
    InscricaoTrilha,
    ProgressoAula,
    QuestaoQuiz,
    Quiz,
    RespostaUsuario
  ],
  migrations: [
    enderecos1693428187265,
    profissionaisDetalhes1693428187261,
    unidadesSaude1693428187262,
    farmacias1693428187263,
    localizacao1693428187266,
    postagens1693428187270,
    comentarios1693428187272,
    conversas1693428187276,
    curtidas1693428187271,
    notificacoes1693428187275,
    salvamentos1693428187274,
    seguidores1693428187273,
    CreateTrilhasTable1693428187273,
    CreateInscricoesTrilhaTable1693428187273,
    CreateModulosTrilhaTable1693428187273,
    CreateAulasTable1693428187273,
    CreateCertificadosTable1693428187273,
    CreateProgressoAulaTable1693428187273,
    CreateQuizzesTable1693428187273,
    CreateQuestoesQuizTable1693428187273,
    CreateRespostasUsuariosTable1693428187273,
    categoriasPostagens1693431234567,
    AddEnderecoIdToUnidadesSaude1693428187273,
    AddEnderecoIdToFarmacias1693428187273,
    AddRelacionamentosEnderecoFarmaciaUnidade1693428187273
  ],
});

export default dataSource;
