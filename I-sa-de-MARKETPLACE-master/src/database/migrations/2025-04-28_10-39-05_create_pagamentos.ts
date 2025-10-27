import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePagamentosTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pagamentos (
        id SERIAL PRIMARY KEY,
        pedido_id INTEGER NOT NULL,
        metodo VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        id_mp_payment INTEGER NOT NULL,
        valor DECIMAL(10,2) NOT NULL,
        pago_em TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_pagamento_pedido FOREIGN KEY (pedido_id)
          REFERENCES pedidos(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE pagamentos');
  }
}
