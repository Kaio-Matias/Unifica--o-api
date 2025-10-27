import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInscricoesTrilhaTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE inscricoes_trilha (
        id_inscricao SERIAL PRIMARY KEY,
        id_trilha INTEGER NOT NULL,
        id_usuario INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL,
        data_inscricao TIMESTAMP DEFAULT NOW(),
        data_conclusao TIMESTAMP,
        certificado_gerado BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_trilha_inscricao FOREIGN KEY (id_trilha) REFERENCES trilhas(id_trilha) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE inscricoes_trilha');
  }
}
