import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCarrinhoItensTable1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE carrinho_itens (
        id SERIAL PRIMARY KEY,
        carrinho_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_carrinho FOREIGN KEY (carrinho_id)
          REFERENCES carrinhos(id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_produto FOREIGN KEY (produto_id)
          REFERENCES pharmacy_products(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE carrinho_itens');
  }
}
