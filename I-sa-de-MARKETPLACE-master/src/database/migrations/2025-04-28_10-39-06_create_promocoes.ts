import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePromocoesTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE promocoes (
        id SERIAL PRIMARY KEY,
        farmacia_id INTEGER NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT,
        inicio TIMESTAMP NOT NULL,
        fim TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_promocao_farmacia FOREIGN KEY (farmacia_id)
          REFERENCES pharmacies(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE promocoes');
  }
}

