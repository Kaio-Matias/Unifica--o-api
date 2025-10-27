/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createStoriesTable1693428200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE stories (
        id SERIAL PRIMARY KEY,
        autor_id INT NOT NULL,
        conteudo TEXT NOT NULL,
        tipo_conteudo VARCHAR(20) NOT NULL,
        duracao_segundos INT DEFAULT 15,
        dt_publicacao TIMESTAMP DEFAULT NOW(),
        visualizacoes INT DEFAULT 0,
        curtidas INT DEFAULT 0,
        compartilhamentos INT DEFAULT 0,
        expirado BOOLEAN DEFAULT FALSE,
        ativo BOOLEAN DEFAULT TRUE,
        hashtags TEXT,
        idioma VARCHAR(10),
        id_localizacao INT,
        tempo_medio_visualiz NUMERIC(5,2),
        engajamento_score NUMERIC(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_stories_localizacao FOREIGN KEY (id_localizacao) REFERENCES localizacao(id_localizacao) ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE stories`);
  }
}
