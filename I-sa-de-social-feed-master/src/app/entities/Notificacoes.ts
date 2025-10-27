import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity("notificacoes")
export class Notificacao {
  @PrimaryGeneratedColumn()
  id_notificacao: number;

  @Column()
  id_usuario: number;

  @Column({ length: 50 })
  tipo_notificacao: string;

  @Column({ length: 20, nullable: true })
  origem_tipo: string;

  @Column({ nullable: true })
  origem_id: number;

  @Column({ default: false })
  lida: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
