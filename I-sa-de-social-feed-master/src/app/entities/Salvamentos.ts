import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Postagem } from './Postagens';  // Importando a entidade Postagem

@Entity("salvamentos")
export class Salvamento {
  @PrimaryGeneratedColumn()
  id_salvamento: number;

  @Column()
  id_usuario: number;

  @Column({ length: 20 })
  tipo_conteudo: string;

  @ManyToOne(() => Postagem, postagem => postagem.salvamentos, { nullable: true,  onDelete: 'CASCADE', })
  @JoinColumn({ name: 'id_conteudo' })
  postagem: Postagem;

  @RelationId((salvamento: Salvamento) => salvamento.postagem)
  id_conteudo: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
