import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('receitas_digitais')
export class ReceitaDigital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  medico_id: number;

  @Column('text')
  arquivo_url: string;

  @Column({ type: 'date' })
  validade: Date;

  @Column({ default: false })
  validada: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
