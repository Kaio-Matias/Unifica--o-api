import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuestoesQuizTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE questoes_quiz (
        id_questao SERIAL PRIMARY KEY,
        id_quiz INTEGER NOT NULL,
        texto_questao VARCHAR(255) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        resposta_correta VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_quiz_questao FOREIGN KEY (id_quiz) REFERENCES quizzes(id_quiz) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE t_questoes_quiz');
  }
}
