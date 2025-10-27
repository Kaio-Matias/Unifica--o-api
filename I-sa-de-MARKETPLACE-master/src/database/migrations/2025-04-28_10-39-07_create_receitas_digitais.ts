/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReceitasDigitaisTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE receitas_digitais (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        medico_id INTEGER NOT NULL,
        arquivo_url TEXT NOT NULL,
        validade DATE NOT NULL,
        validada BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE receitas_digitais');
  }
}
