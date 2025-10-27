/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class comentarios1693428187272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    id_postagem INT NOT NULL,
    autor_id INT,
    texto TEXT NOT NULL,
    id_pai INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comentario_postagem FOREIGN KEY (id_postagem) REFERENCES postagens(id) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_pai FOREIGN KEY (id_pai) REFERENCES comentarios(id) ON DELETE CASCADE
  );
`);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE comentarios');
  }
}
