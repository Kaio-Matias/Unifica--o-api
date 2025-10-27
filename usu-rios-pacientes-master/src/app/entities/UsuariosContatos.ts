

import {
  Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId
} from 'typeorm';
import { User } from './Users';

@Entity("usuarios_contatos")
export class UsuariosContatos {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, usuario => usuario.contatos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @RelationId((contactUser: UsuariosContatos) => contactUser.usuario)
  usuario_id: number;

  @ManyToOne(() => User, user => user.contatos_de_outros)
  @JoinColumn({ name: 'contato_id' })
  contato: User;

  @RelationId((contactUser: UsuariosContatos) => contactUser.contato)
  contato_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
