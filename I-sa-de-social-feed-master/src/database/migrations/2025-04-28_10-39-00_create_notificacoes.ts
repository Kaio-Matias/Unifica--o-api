/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class notificacoes1693428187275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TABLE notificacoes (
    id_notificacao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_notificacao VARCHAR(50) NOT NULL,
    origem_tipo VARCHAR(20),
    origem_id INT,
    lida BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE notificacoes');
  }
}

