import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAulasTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE aulas (
        id_aula SERIAL PRIMARY KEY,
        id_modulo INTEGER NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        url_conteudo VARCHAR(255) NOT NULL,
        duracao_min INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_modulo FOREIGN KEY (id_modulo) REFERENCES modulos_trilha(id_modulo) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE aulas');
  }
}
