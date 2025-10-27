import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, RelationId } from 'typeorm';
import { Pharmacy } from './Pharmacy';
import { Medicamento } from './Medicamento';

@Entity('pharmacy_products')
export class PharmacyProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pharmacy, farmacia => farmacia.produtos)
  @JoinColumn({ name: 'farmacia_id' })
  farmacia: Pharmacy;

  @RelationId((pharmacyProduct: PharmacyProduct) => pharmacyProduct.farmacia)
  farmacia_id: number;

  @ManyToOne(() => Medicamento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'medicamento_id' })
  medicamento: Medicamento;

  @RelationId((pharmacyProduct: PharmacyProduct) => pharmacyProduct.medicamento)
  medicamento_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column({ default: 0 })
  estoque: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
