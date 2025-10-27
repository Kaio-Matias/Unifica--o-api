import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRespostasUsuariosTable1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE respostas_usuarios (
        id_resposta SERIAL PRIMARY KEY,
        id_questao INTEGER NOT NULL,
        id_usuario INTEGER NOT NULL,
        resposta_fornecida VARCHAR(255) NOT NULL,
        correta BOOLEAN NOT NULL,
        data_resposta TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_questao_resposta FOREIGN KEY (id_questao) REFERENCES questoes_quiz(id_questao) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE respostas_usuarios');
  }
}
