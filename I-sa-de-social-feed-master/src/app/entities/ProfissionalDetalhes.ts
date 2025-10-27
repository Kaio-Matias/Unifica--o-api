import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profissionais_detalhes')
@Unique(['registro_prof'])
export class ProfissionalDetalhes {
  @PrimaryGeneratedColumn({ name: 'id_profissionais_detalhes' })
  id: number;

  @Column({ length: 100 })
  area_atuacao: string;

  @Column()
  id_user: number;

  @Column({ length: 50 })
  registro_prof: string;

  @Column({ length: 100, nullable: true })
  especialidade: string;

  @Column({ length: 2 })
  est_atuacao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
