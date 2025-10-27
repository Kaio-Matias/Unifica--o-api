import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Farmacia } from './Farmacia';
import { UnidadeSaude } from './UnidadeSaude';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn({ name: 'id_endereco' })
  id: number;

  @Column()
  id_usuario: number;

  @Column({ name: 'cnpj_farmacia', type: 'varchar', length: 14, nullable: true })
  cnpj_farmacia?: string;

  @Column({ name: 'cnpj_unidade_saude', type: 'varchar', length: 14, nullable: true })
  cnpj_unidade_saude?: string;

  @ManyToOne(() => Farmacia, farmacia => farmacia.enderecos, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cnpj_farmacia', referencedColumnName: 'cnpj' })
  farmacia?: Farmacia;

  @ManyToOne(() => UnidadeSaude, unidadeSaude => unidadeSaude.endereco, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cnpj_unidade_saude', referencedColumnName: 'cnpj' })
  unidadeSaude?: UnidadeSaude;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 255 })
  logradouro: string;

  @Column({ length: 10, nullable: true })
  numero: string;

  @Column({ length: 100, nullable: true })
  complemento: string;

  @Column({ length: 100 })
  bairro: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 50 })
  pais: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
