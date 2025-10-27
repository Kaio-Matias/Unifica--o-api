import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  RelationId,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Comentario } from './Comentarios';
import { Curtida } from './Curtidas';
import { Localizacao } from './Localizacao';
import { CategoriaPostagem } from './CategoriaPostagem';
import { Salvamento } from './Salvamentos'; // Importando a entidade Salvamento

@Entity("postagens")
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  conteudo: string;

  @CreateDateColumn()
  dt_postagem: Date;

  @Column()
  autor_id: number;

  @Column({ length: 20 })
  tipo_conteudo: string;

  @Column({ nullable: true })
  duracao_segundos: number;

  @ManyToMany(() => CategoriaPostagem, categoria => categoria.postagens, {
    cascade: true
  })
  @JoinTable({
    name: 'postagens_categorias',
    joinColumn: {
      name: 'postagem_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoria_id',
      referencedColumnName: 'id_categoria',
    },
  })
  categorias: CategoriaPostagem[];

  @Column({ length: 10, nullable: true })
  idioma: string;

  @ManyToOne(() => Localizacao, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_localizacao' })
  localizacao: Localizacao;

  @RelationId((postagem: Postagem) => postagem.localizacao)
  id_localizacao: number;

  @Column("text", { nullable: true })
  hashtags: string;

  @Column({ default: 0 })
  visualizacoes: number;

  @Column({ default: 0 })
  curtidas: number;

  @Column({ default: 0 })
  compartilhamentos: number;

  @Column({ default: 0 })
  comentarios_qtd: number;

  @Column("numeric", { precision: 5, scale: 2, nullable: true })
  tempo_medio_visualiz: number;

  @Column("numeric", { precision: 5, scale: 2, nullable: true })
  engajamento_score: number;

  @OneToMany(() => Comentario, comentario => comentario.postagem)
  comentarios: Comentario[];

  @OneToMany(() => Curtida, curtida => curtida.postagem)
  curtidas_list: Curtida[];

  @OneToMany(() => Salvamento, salvamento => salvamento.postagem) // Adicionando o relacionamento inverso com Salvamento
  salvamentos: Salvamento[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
