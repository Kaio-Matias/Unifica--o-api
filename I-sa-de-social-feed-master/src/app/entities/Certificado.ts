import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, RelationId } from 'typeorm';
import { InscricaoTrilha } from './InscricaoTrilha';

@Entity("certificados")
export class Certificado {
  @PrimaryGeneratedColumn()
  id_certificado: number;

  @OneToOne(() => InscricaoTrilha, inscricao => inscricao.certificado)
  @JoinColumn({ name: "id_inscricao" })
  inscricao: InscricaoTrilha;

  @RelationId((certificado: Certificado) => certificado.inscricao)
  id_inscricao: number;

  @Column()
  hash_certificado: string;

  @Column()
  url_certificado: string;

  @Column()
  emitido_em: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
