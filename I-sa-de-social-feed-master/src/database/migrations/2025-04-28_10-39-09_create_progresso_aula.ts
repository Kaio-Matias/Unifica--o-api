import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProgressoAulaTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE progresso_aula (
        id_progresso SERIAL PRIMARY KEY,
        id_inscricao INTEGER NOT NULL,
        id_aula INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL,
        tempo_assistido_min INTEGER,
        ultima_visualizacao TIMESTAMP,
        concluido_em TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_inscricao_progresso FOREIGN KEY (id_inscricao) REFERENCES inscricoes_trilha(id_inscricao) ON DELETE CASCADE,
        CONSTRAINT fk_aula_progresso FOREIGN KEY (id_aula) REFERENCES aulas(id_aula) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE t_progresso_aula');
  }
}
