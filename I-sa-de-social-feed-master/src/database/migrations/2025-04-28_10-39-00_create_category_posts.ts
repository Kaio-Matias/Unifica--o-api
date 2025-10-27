/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class categoriasPostagens1693431234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabela de categori
    await queryRunner.query(`
      CREATE TABLE categorias_postagens (
        id_categoria SERIAL PRIMARY KEY,
        nome VARCHAR(100) UNIQUE NOT NULL,
        descricao TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de relação N:N
    await queryRunner.query(`
      CREATE TABLE postagens_categorias (
        postagem_id INTEGER NOT NULL,
        categoria_id INTEGER NOT NULL,
        PRIMARY KEY (postagem_id, categoria_id),
        FOREIGN KEY (postagem_id) REFERENCES postagens(id) ON DELETE CASCADE,
        FOREIGN KEY (categoria_id) REFERENCES categorias_postagens(id_categoria) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE postagens_categorias;');
    await queryRunner.query('DROP TABLE categorias_postagens;');
  }
}
