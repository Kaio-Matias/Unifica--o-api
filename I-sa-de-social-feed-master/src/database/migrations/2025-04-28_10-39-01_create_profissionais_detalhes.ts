/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class profissionaisDetalhes1693428187261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE profissionais_detalhes (
        id_profissionais_detalhes SERIAL PRIMARY KEY,
        area_atuacao VARCHAR(100) NOT NULL,
        id_user INT NOT NULL,
        registro_prof VARCHAR(50) UNIQUE NOT NULL,
        especialidade VARCHAR(100),
        est_atuacao VARCHAR(2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE profissionais_detalhes');
  }
}
