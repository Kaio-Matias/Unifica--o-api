/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class usuariosContatos1718145260000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE usuarios_contatos (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL,
        contato_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_usuario_contato_usuario FOREIGN KEY (usuario_id) REFERENCES users(id_usuario) ON DELETE CASCADE,
        CONSTRAINT fk_usuario_contato_contato FOREIGN KEY (contato_id) REFERENCES contatos(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE usuarios_contatos');
  }
}
