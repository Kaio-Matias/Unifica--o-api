/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePedidoItensTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pedido_itens (
        id SERIAL PRIMARY KEY,
        pedido_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        quantity INTEGER NOT NULL,
        description VARCHAR(255),
        picture_url VARCHAR(500),
        currency_id VARCHAR(10) DEFAULT 'BRL',
        category_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
        CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES pharmacy_products(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pedido_itens`);
  }
}
