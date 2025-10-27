import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, RelationId } from 'typeorm';
import { Pagamento } from './Pagamento';
import { Pharmacy } from './Pharmacy';
import { PedidoItem } from './PedidoItems';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Pharmacy, pharmacy => pharmacy.pedidos)
  @JoinColumn({ name: 'farmacia_id' })
  farmacia: Pharmacy;

  @RelationId((pedido: Pedido) => pedido.farmacia)
  farmacia_id: number;

  @OneToMany(() => Pagamento, pagamento => pagamento.pedido)
  pagamentos: Pagamento[];

  @Column('decimal', { precision: 10, scale: 2 })
  valor_total: number;

  @OneToMany(() => PedidoItem, item => item.pedido, { cascade: true })
  itens: PedidoItem[];

  @Column({ length: 50 })
  status: string;

  @Column({ length: 20 })
  tipo_entrega: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
