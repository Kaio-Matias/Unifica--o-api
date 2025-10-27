/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class salvamentos1693428187274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TABLE salvamentos (
    id_salvamento SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_conteudo VARCHAR(20) NOT NULL,
    id_conteudo INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_usuario, tipo_conteudo, id_conteudo),
    CONSTRAINT fk_salvamento_postagem FOREIGN KEY (id_conteudo) REFERENCES postagens(id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`);

  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE salvamentos');
  }
}
