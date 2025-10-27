import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId, OneToMany } from 'typeorm';
import { Quiz } from './Quiz';
import { RespostaUsuario } from './RespostaUsuario';

export enum QuestaoTipo {
  MULTIPLA_ESCOLHA = 'Múltipla Escolha',
  VERDADEIRO_FALSO = 'Verdadeiro ou Falso',
  DISCURSIVA = 'Discursiva'
}

@Entity("questoes_quiz")
export class QuestaoQuiz {
  @PrimaryGeneratedColumn()
  id_questao: number;

  @ManyToOne(() => Quiz, quiz => quiz.questoes)
  @JoinColumn({ name: "id_quiz" })
  quiz: Quiz;

  @RelationId((questaoQuiz: QuestaoQuiz) => questaoQuiz.quiz)
  id_quiz: number;

  @Column()
  texto_questao: string;

  @Column()
  tipo: string;

  @Column()
  resposta_correta: string;

  @OneToMany(() => RespostaUsuario, respostaUsuario => respostaUsuario.questao)
  respostas: RespostaUsuario[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
