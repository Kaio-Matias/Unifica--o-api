/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMedicamentosTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE medicamentos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        principio_ativo VARCHAR(255) NOT NULL,
        tarja VARCHAR(50),
        controlado BOOLEAN DEFAULT FALSE,
        receita_obrig BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE medicamentos');
  }
}

