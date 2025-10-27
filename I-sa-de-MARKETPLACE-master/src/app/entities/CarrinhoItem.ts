import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Carrinho } from './Carrinho';
import { PharmacyProduct } from './PharmacyProduct';

@Entity('carrinho_itens')
export class CarrinhoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrinho, carrinho => carrinho.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carrinho_id' })
  carrinho: Carrinho;

  @RelationId((carrinhoItem: CarrinhoItem) => carrinhoItem.carrinho)
  carrinho_id: number;

  @ManyToOne(() => PharmacyProduct, { eager: true })
  @JoinColumn({ name: 'produto_id' })
  produto: PharmacyProduct;

  @RelationId((carrinhoItem: CarrinhoItem) => carrinhoItem.produto)
  produto_id: number;

  @Column()
  quantidade: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

