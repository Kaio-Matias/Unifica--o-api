/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class postagens1693428187270 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE postagens (
        id SERIAL PRIMARY KEY,
        conteudo TEXT NOT NULL,
        dt_postagem TIMESTAMP DEFAULT NOW(),
        autor_id INT,
        tipo_conteudo VARCHAR(20) NOT NULL,
        duracao_segundos INT,
        categorias TEXT,
        idioma VARCHAR(10),
        id_localizacao INT,
        localizacao_postagem VARCHAR(100),
        hashtags TEXT,
        visualizacoes INT DEFAULT 0,
        curtidas INT DEFAULT 0,
        compartilhamentos INT DEFAULT 0,
        comentarios_qtd INT DEFAULT 0,
        tempo_medio_visualiz NUMERIC(5,2),
        engajamento_score NUMERIC(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_postagens_localizacao FOREIGN KEY (id_localizacao) REFERENCES localizacao(id_localizacao) ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE postagens`);
  }
}
