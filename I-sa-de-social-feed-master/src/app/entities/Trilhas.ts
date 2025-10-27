import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ModuloTrilha } from './ModulosTrilhas';
import { InscricaoTrilha } from './InscricaoTrilha';

@Entity("trilhas")
export class Trilha {
  @PrimaryGeneratedColumn()
  id_trilha: number;

  @Column()
  titulo: string;

  @Column({ nullable: true, type: "text" })
  descricao: string;

  @Column({ nullable: true })
  area_atuacao: string;

  @Column({ nullable: true, type: "int" })
  duracao_estimada_horas: number;

  @OneToMany(() => ModuloTrilha, modulo => modulo.trilha)
  modulos: ModuloTrilha[];

  @OneToMany(() => InscricaoTrilha, inscricao => inscricao.trilha)
  inscricoes: InscricaoTrilha[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
