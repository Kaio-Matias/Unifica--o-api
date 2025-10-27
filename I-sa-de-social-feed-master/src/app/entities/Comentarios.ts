import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  RelationId
} from 'typeorm';
import { Postagem } from './Postagens';

@Entity("comentarios")
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Postagem, postagem => postagem.comentarios)
  @JoinColumn({ name: "id_postagem" })
  postagem: Postagem;

  @RelationId((comentario: Comentario) => comentario.postagem)
  id_postagem: number;

  @Column()
  autor_id: number;

  @Column("text")
  texto: string;

  @ManyToOne(() => Comentario, comentario => comentario.respostas, { nullable: true })
  @JoinColumn({ name: "id_pai" })
  comentario_pai: Comentario;

  @RelationId((comentario: Comentario) => comentario.comentario_pai)
  id_pai: number;

  @OneToMany(() => Comentario, comentario => comentario.comentario_pai)
  respostas: Comentario[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

