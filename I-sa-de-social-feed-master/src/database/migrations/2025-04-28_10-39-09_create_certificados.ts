import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCertificadosTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE certificados (
        id_certificado SERIAL PRIMARY KEY,
        id_inscricao INTEGER NOT NULL,
        hash_certificado VARCHAR(255) NOT NULL,
        url_certificado VARCHAR(255) NOT NULL,
        emitido_em TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_inscricao_certificado FOREIGN KEY (id_inscricao) REFERENCES inscricoes_trilha(id_inscricao) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE certificados')
  }
}
