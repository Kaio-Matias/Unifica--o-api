import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePedidosTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pedidos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        farmacia_id INTEGER NOT NULL,
        valor_total DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) NOT NULL,
        tipo_entrega VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_pedido_farmacia FOREIGN KEY (farmacia_id)
          REFERENCES pharmacies(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE pedidos');
  }
}
