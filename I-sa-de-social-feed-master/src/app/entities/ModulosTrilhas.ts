import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Trilha } from './Trilhas';
import { Aula } from './Aulas';

@Entity("modulos_trilha")
export class ModuloTrilha {
  @PrimaryGeneratedColumn()
  id_modulo: number;

  @ManyToOne(() => Trilha, trilha => trilha.modulos)
  @JoinColumn({ name: "id_trilha" })
  trilha: Trilha;

  @RelationId((moduloTrilha: ModuloTrilha) => moduloTrilha.trilha)
  id_trilha: number;

  @OneToMany(() => Aula, aula => aula.modulo)
  aulas: Aula[];

  @Column()
  titulo: string;

  @Column({ nullable: true, type: "text" })
  descricao: string;

  @Column()
  ordem: number;

  @Column({ nullable: true })
  duracao_estimada_min: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
