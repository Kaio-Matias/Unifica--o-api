import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Localizacao } from './Localizacao';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'autor_id', type: 'int' })
  autorId: number;

  @Column({ type: 'text' })
  conteudo: string;

  @Column({ name: 'tipo_conteudo', type: 'varchar', length: 20 })
  tipoConteudo: string;

  @Column({ name: 'duracao_segundos', type: 'int', default: 15 })
  duracaoSegundos: number;

  @Column({ name: 'dt_publicacao', type: 'timestamp', default: () => 'NOW()' })
  dtPublicacao: Date;

  @Column({ type: 'int', default: 0 })
  visualizacoes: number;

  @Column({ type: 'int', default: 0 })
  curtidas: number;

  @Column({ type: 'int', default: 0 })
  compartilhamentos: number;

  @Column({ type: 'boolean', default: false })
  expirado: boolean;

  @Column({ type: 'boolean', default: true })
  ativo: boolean;

  @Column({ type: 'text', nullable: true })
  hashtags: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  idioma: string;

  @Column({ name: 'id_localizacao', type: 'int', nullable: true })
  idLocalizacao: number;

  @ManyToOne(() => Localizacao, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_localizacao' })
  localizacao: Localizacao;

  @Column({ name: 'tempo_medio_visualiz', type: 'numeric', precision: 5, scale: 2, nullable: true })
  tempoMedioVisualiz: number;

  @Column({ name: 'engajamento_score', type: 'numeric', precision: 5, scale: 2, nullable: true })
  engajamentoScore: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
