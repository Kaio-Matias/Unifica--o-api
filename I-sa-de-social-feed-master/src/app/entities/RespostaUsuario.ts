import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { QuestaoQuiz } from './QuestaoQuiz';

@Entity("respostas_usuarios")
export class RespostaUsuario {
  @PrimaryGeneratedColumn()
  id_resposta: number;

  @ManyToOne(() => QuestaoQuiz, questao => questao.respostas)
  @JoinColumn({ name: 'id_questao' })
  questao: QuestaoQuiz;

  @RelationId((respostaUsuario: RespostaUsuario) => respostaUsuario.questao)
  id_questao: number;

  @Column()
  id_usuario: number;

  @Column()
  resposta_fornecida: string;

  @Column()
  correta: boolean;

  @Column()
  data_resposta: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
