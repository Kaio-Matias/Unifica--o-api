/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class unidadesSaude1693428187262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TABLE unidades_saude (
    cnpj VARCHAR(14) PRIMARY KEY UNIQUE NOT NULL,
    nm_fantasia VARCHAR(255) NOT NULL,
    tipo_unidade VARCHAR(100) NOT NULL,
    resp_legal VARCHAR(255) NOT NULL,
    cpf_resp VARCHAR(11) NOT NULL,
    registro_resp VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE unidades_saude');
  }
}
