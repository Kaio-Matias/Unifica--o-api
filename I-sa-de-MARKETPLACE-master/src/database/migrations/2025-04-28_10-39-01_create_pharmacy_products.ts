/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePharmacyProductsTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pharmacy_products (
        id SERIAL PRIMARY KEY,
        farmacia_id INTEGER NOT NULL,
        medicamento_id INTEGER NOT NULL,
        preco DECIMAL(10,2) NOT NULL,
        estoque INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_farmacia FOREIGN KEY (farmacia_id)
          REFERENCES pharmacies(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_medicamento FOREIGN KEY (medicamento_id)
          REFERENCES medicamentos(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE pharmacy_products');
  }
}
