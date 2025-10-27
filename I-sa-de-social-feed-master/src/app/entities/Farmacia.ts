

import {
  Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  OneToMany
} from 'typeorm';
import { Endereco } from './Endereco';


@Entity('farmacias')
export class Farmacia {
  @PrimaryColumn({ length: 14 })
  cnpj: string;

  @Column({ length: 255 })
  razao_social: string;

  @Column({ length: 255 })
  nm_fantasia: string;

  @Column({ length: 255 })
  resp_tecnico: string;

  @Column()
  cpf_resp: string;

  @Column({ length: 50 })
  registro_resp: string;

  @ManyToOne(() => Endereco, { eager: true, nullable: true })
  @JoinColumn({ name: 'endereco_id', referencedColumnName: 'id' })
  endereco: Endereco;

  @RelationId((farmacia: Farmacia) => farmacia.endereco)
  endereco_id: number;

  @OneToMany(() => Endereco, endereco => endereco.farmacia)
  enderecos: Endereco[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
