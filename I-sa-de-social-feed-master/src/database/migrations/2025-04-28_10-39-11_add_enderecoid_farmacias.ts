import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnderecoIdToFarmacias1693428187273 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE farmacias
      ADD COLUMN endereco_id INT NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE farmacias
      ADD CONSTRAINT fk_farmacia_endereco
      FOREIGN KEY (endereco_id)
      REFERENCES enderecos(id_endereco)
      ON DELETE CASCADE
      ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE farmacias
      DROP CONSTRAINT fk_farmacia_endereco;
    `);

    await queryRunner.query(`
      ALTER TABLE farmacias
      DROP COLUMN endereco_id;
    `);
  }
}
