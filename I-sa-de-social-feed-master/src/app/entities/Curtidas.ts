

import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId
} from 'typeorm';
import { Postagem } from './Postagens';

@Entity("curtidas")
export class Curtida {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Postagem, postagem => postagem.curtidas_list)
  @JoinColumn({ name: "postagem_id" })
  postagem: Postagem;

  @RelationId((curtida: Curtida) => curtida.postagem)
  postagem_id: number;

  @CreateDateColumn()
  dt_curtida: Date;

  @Column()
  autor_id: number;

  @UpdateDateColumn()
  updated_at: Date;
}

