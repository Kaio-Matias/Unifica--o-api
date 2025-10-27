import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuizzesTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE quizzes (
        id_quiz SERIAL PRIMARY KEY,
        id_aula INTEGER NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_aula_quiz FOREIGN KEY (id_aula) REFERENCES aulas(id_aula) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE t_quizzes');
  }
}
