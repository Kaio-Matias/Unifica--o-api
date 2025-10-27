import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, RelationId } from 'typeorm';
import { Aula } from './Aulas';
import { QuestaoQuiz } from './QuestaoQuiz';

@Entity("quizzes")
export class Quiz {
  @PrimaryGeneratedColumn()
  id_quiz: number;

  @ManyToOne(() => Aula, aula => aula.quizzes)
  @JoinColumn({ name: "id_aula" })
  aula: Aula;

  @RelationId((quiz: Quiz) => quiz.aula)
  id_aula: number;

  @OneToMany(() => QuestaoQuiz, questao => questao.quiz)
  questoes: QuestaoQuiz[];

  @Column()
  titulo: string;

  @Column({ type: "text" })
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
