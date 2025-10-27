import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModulosTrilhaTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE modulos_trilha (
        id_modulo SERIAL PRIMARY KEY,
        id_trilha INTEGER NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT,
        ordem INTEGER NOT NULL,
        duracao_estimada_min INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_trilha FOREIGN KEY (id_trilha) REFERENCES trilhas(id_trilha) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE modulos_trilha');
  }
}
