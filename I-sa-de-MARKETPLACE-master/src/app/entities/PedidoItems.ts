// src/entities/PedidoItem.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';

import { Pedido } from './Pedido';
import { PharmacyProduct } from './PharmacyProduct';

@Entity('pedido_itens')
export class PedidoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @RelationId((item: PedidoItem) => item.pedido)
  pedido_id: number;

  @ManyToOne(() => PharmacyProduct, { eager: true })
  @JoinColumn({ name: 'produto_id' })
  produto: PharmacyProduct;

  @RelationId((item: PedidoItem) => item.produto)
  produto_id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price: number;

  @Column('int')
  quantity: number;

  @Column('varchar', { length: 255, nullable: true })
  description: string;

  @Column('varchar', { length: 500, nullable: true })
  picture_url: string;

  @Column('varchar', { length: 10, default: 'BRL' })
  currency_id: string;

  @Column('varchar', { length: 50, nullable: true })
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
