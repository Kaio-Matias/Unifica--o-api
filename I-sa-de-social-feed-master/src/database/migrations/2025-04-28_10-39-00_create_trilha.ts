import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrilhasTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE trilhas (
        id_trilha SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT,
        area_atuacao VARCHAR(255),
        duracao_estimada_horas INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE trilhas');
  }
}
