import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelacionamentosEnderecoFarmaciaUnidade1693428187273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE enderecos
      ADD CONSTRAINT fk_endereco_farmacia
      FOREIGN KEY (cnpj_farmacia)
      REFERENCES farmacias(cnpj)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE enderecos
      ADD CONSTRAINT fk_endereco_unidade_saude
      FOREIGN KEY (cnpj_unidade_saude)
      REFERENCES unidades_saude(cnpj)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE enderecos DROP CONSTRAINT fk_endereco_farmacia;
    `);

    await queryRunner.query(`
      ALTER TABLE enderecos DROP CONSTRAINT fk_endereco_unidade_saude;
    `);
  }
}
