/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seguidores1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE seguidores (
        id_seguidor SERIAL PRIMARY KEY,
        seguidor_id INT NOT NULL,
        seguindo_id INT NOT NULL,
        status VARCHAR(20) DEFAULT 'Pendente' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(seguidor_id, seguindo_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE seguidores');
  }
}
