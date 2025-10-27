import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, RelationId } from 'typeorm';
import { ModuloTrilha } from './ModulosTrilhas';
import { Quiz } from './Quiz';
import { ProgressoAula } from './ProgressoAula';

@Entity("aulas")
export class Aula {
  @PrimaryGeneratedColumn()
  id_aula: number;

  @ManyToOne(() => ModuloTrilha, modulo => modulo.aulas)
  @JoinColumn({ name: "id_modulo" })
  modulo: ModuloTrilha;

  @RelationId((aula: Aula) => aula.modulo)
  id_modulo: number;

  @OneToMany(() => Quiz, quiz => quiz.aula)
  quizzes: Quiz[];

  @OneToMany(() => ProgressoAula, progresso => progresso.aula)
  progressos: ProgressoAula[];

  @Column()
  titulo: string;

  @Column()
  tipo: string;

  @Column()
  url_conteudo: string;

  @Column({ nullable: true })
  duracao_min: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
