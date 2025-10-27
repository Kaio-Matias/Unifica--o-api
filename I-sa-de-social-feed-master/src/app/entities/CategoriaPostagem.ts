import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { Postagem } from './Postagens';

@Entity('categorias_postagens')
export class CategoriaPostagem {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 100, unique: true })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @ManyToMany(() => Postagem, postagem => postagem.categorias)
  postagens: Postagem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
