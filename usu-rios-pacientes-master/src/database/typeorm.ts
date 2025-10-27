import { DataSource } from 'typeorm';
import {
  User,
  Contato,
  UsuariosContatos
} from '../app/entities';

import { CreateUsersTable1718145260000 } from './migrations/2025-04-28_10-39-00_create_users';
import { contatos1718145260000 } from './migrations/2025-04-28_10-39-04_create_contatos';
import { usuariosContatos1718145260000 } from './migrations/2025-04-28_10-39-06_create_usuarios_contatos';


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
    User,
    Contato,
    UsuariosContatos,
  ],
  migrations: [
    CreateUsersTable1718145260000,
    contatos1718145260000,
    usuariosContatos1718145260000
  ],
});

export default dataSource;
