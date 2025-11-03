import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId
} from 'typeorm';
import { Endereco } from './Endereco';


@Entity('unidades_saude')
export class UnidadeSaude {
  @PrimaryColumn({ length: 14 })
  cnpj: string;

  @Column({ length: 255 })
  nm_fantasia: string;

  @Column({ length: 100 })
  tipo_unidade: string;

  @Column({ length: 255 })
  resp_legal: string;

  @Column()
  cpf_resp: string;

  // <<< CORREÇÃO AQUI
  // Adicionamos 'name: 'registro_resp'' para mapear corretamente
  // a propriedade 'registroResp' para a coluna 'registro_resp' do banco.
  @Column({ name: 'registro_resp', length: 50 })
  registroResp: string;

  @ManyToOne(() => Endereco, { eager: true, nullable: false })
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @RelationId((unidadeSaude: UnidadeSaude) => unidadeSaude.endereco)
  endereco_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}