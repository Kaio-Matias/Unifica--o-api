import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Pedido } from './Pedido';

@Entity('pagamentos')
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.pagamentos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @RelationId((pagamento: Pagamento) => pagamento.pedido)
  pedido_id: number;

  @Column({ length: 50 })
  metodo: string;

  @Column({ length: 50 })
  status: string;

  @Column()
  id_mp_payment: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: 'timestamp', nullable: true })
  pago_em: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
