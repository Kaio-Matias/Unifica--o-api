/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class curtidas1693428187271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TABLE curtidas (
    id SERIAL PRIMARY KEY,
    postagem_id INT NOT NULL,
    autor_id INT,
    dt_curtida TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(postagem_id, autor_id),
    CONSTRAINT fk_curtida_postagem FOREIGN KEY (postagem_id) REFERENCES postagens(id) ON DELETE CASCADE
  );
`);

  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE curtidas');
  }
}
