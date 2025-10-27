import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { InscricaoTrilha } from './InscricaoTrilha';
import { Aula } from './Aulas';

@Entity("progresso_aula")
export class ProgressoAula {
  @PrimaryGeneratedColumn()
  id_progresso: number;

  @ManyToOne(() => InscricaoTrilha, inscricao => inscricao.progressos)
  @JoinColumn({ name: "id_inscricao" })
  inscricao: InscricaoTrilha;

  @RelationId((progressClass: ProgressoAula) => progressClass.inscricao)
  id_inscricao: number;

  @ManyToOne(() => Aula, aula => aula.progressos)
  @JoinColumn({ name: "id_aula" })
  aula: Aula;

  @RelationId((progressClass: ProgressoAula) => progressClass.inscricao)
  id_aula: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  tempo_assistido_min: number;

  @Column({ nullable: true, type: "timestamp" })
  ultima_visualizacao: Date;

  @Column({ nullable: true, type: "timestamp" })
  concluido_em: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
