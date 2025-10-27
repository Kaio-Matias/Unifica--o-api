/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class conversas1693428187276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE conversas (
        id SERIAL PRIMARY KEY,
        remetente_id INT,
        destinatario_id INT,
        mensagem TEXT NOT NULL,
        dt_envio TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE conversas');
  }
}
