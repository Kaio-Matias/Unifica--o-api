import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Trilha } from './Trilhas';
import { ProgressoAula } from './ProgressoAula';
import { Certificado } from './Certificado';

@Entity("inscricoes_trilha")
export class InscricaoTrilha {
  @PrimaryGeneratedColumn()
  id_inscricao: number;

  @Column()
  id_usuario: number;

  @ManyToOne(() => Trilha, trilha => trilha.inscricoes)
  @JoinColumn({ name: "id_trilha" })
  trilha: Trilha;

  @RelationId((inscricaoTrilha: InscricaoTrilha) => inscricaoTrilha.trilha)
  id_trilha: number;

  @OneToMany(() => ProgressoAula, progresso => progresso.inscricao)
  progressos: ProgressoAula[];

  @OneToOne(() => Certificado, certificado => certificado.inscricao)
  certificado: Certificado;

  @Column()
  status: string;

  @CreateDateColumn()
  data_inscricao: Date;

  @Column({ nullable: true, type: "timestamp" })
  data_conclusao: Date;

  @Column({ default: false })
  certificado_gerado: boolean;

  @UpdateDateColumn()
  updated_at: Date;
}
