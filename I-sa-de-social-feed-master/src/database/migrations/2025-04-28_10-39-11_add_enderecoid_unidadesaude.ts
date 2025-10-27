import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnderecoIdToUnidadesSaude1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE unidades_saude
      ADD COLUMN endereco_id INT NOT NULL;

      ALTER TABLE unidades_saude
      ADD CONSTRAINT fk_endereco
      FOREIGN KEY (endereco_id)
      REFERENCES enderecos(id_endereco)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE unidades_saude
      DROP CONSTRAINT fk_endereco;

      ALTER TABLE unidades_saude
      DROP COLUMN endereco_id;
    `);
  }
}
