/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1718145260000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id_usuario SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha_hash TEXT NOT NULL,
        tipo_usuario VARCHAR(50) NOT NULL,
        telefone VARCHAR(20),
        genero VARCHAR(10),
        dt_nascimento DATE,
        estado VARCHAR(2),
        is_active BOOLEAN DEFAULT TRUE,
        cpfcnpj VARCHAR(14) UNIQUE ,
        ft_perfil VARCHAR(255),
        ft_capa VARCHAR(255),
        perfil_privado BOOLEAN DEFAULT FALSE NOT NULL,
        descricao_bio VARCHAR(500),
        is_verificado BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
