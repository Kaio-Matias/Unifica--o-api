import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column
} from 'typeorm';
import { CarrinhoItem } from './CarrinhoItem';

@Entity('carrinhos')
export class Carrinho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @OneToMany(() => CarrinhoItem, item => item.carrinho)
  itens: CarrinhoItem[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
