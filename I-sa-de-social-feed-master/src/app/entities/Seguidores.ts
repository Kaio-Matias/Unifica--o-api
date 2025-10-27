

import {
  Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity("seguidores")
@Unique(["seguidor_id", "seguindo_id"])
export class Seguidor {
  @PrimaryGeneratedColumn()
  id_seguidor: number;

  @Column()
  seguidor_id: number;

  @Column()
  seguindo_id: number;

  @Column({ length: 20, default: "Pendente" })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
