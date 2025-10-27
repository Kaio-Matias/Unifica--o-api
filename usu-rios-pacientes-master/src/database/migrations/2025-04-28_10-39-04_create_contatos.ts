import { MigrationInterface, QueryRunner } from 'typeorm';

export class contatos1718145260000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE contatos (
        id SERIAL PRIMARY KEY,
        tipo_contato INT NOT NULL,
        valor VARCHAR(255) NOT NULL,
        is_principal BOOLEAN DEFAULT FALSE,
        dt_criacao TIMESTAMP DEFAULT NOW(),
        dt_inativacao TIMESTAMP,
        id_usuario INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_contato_usuario FOREIGN KEY (id_usuario)
          REFERENCES users(id_usuario)
          ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE contatos');
  }
}
