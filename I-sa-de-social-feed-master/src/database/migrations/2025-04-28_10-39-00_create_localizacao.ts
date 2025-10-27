/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class localizacao1693428187266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE localizacao (
        id_localizacao SERIAL PRIMARY KEY,
        id_usuario INTEGER NOT NULL,
        latitude NUMERIC(9,6) NOT NULL,
        longitude NUMERIC(9,6) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE localizacao');
  }
}
