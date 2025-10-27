
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity("conversas")
export class Conversa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  remetente_id: number;

  @Column()
  destinatario_id: number;

  @Column("text")
  mensagem: string;

  @CreateDateColumn()
  dt_envio: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
