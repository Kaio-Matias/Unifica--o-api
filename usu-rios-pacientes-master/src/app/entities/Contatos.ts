import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, ManyToOne, RelationId,
  JoinColumn
} from 'typeorm';
import { User } from './Users';

@Entity("contatos")
export class Contato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo_contato: number;

  @Column({ length: 255 })
  valor: string;

  @Column({ default: false })
  is_principal: boolean;

  @CreateDateColumn()
  dt_criacao: Date;

  @Column({ nullable: true })
  dt_inativacao: Date;

  @ManyToOne(() => User, usuario => usuario.contatos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @RelationId((contato: Contato) => contato.usuario)
  id_usuario: number;

  @UpdateDateColumn()
  updated_at: Date;
}
