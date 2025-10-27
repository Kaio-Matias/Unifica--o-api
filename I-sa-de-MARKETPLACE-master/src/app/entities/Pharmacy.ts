import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PharmacyProduct } from './PharmacyProduct';
import { Promocao } from './Promocao';
import { Pedido } from './Pedido';

@Entity('pharmacies')
export class Pharmacy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 20, unique: true })
  cnpj: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column('decimal', { precision: 10, scale: 8 })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude: number;

  @OneToMany(() => PharmacyProduct, produto => produto.farmacia)
  produtos: PharmacyProduct[];

  @OneToMany(() => Promocao, promocao => promocao.farmacia)
  promocoes: Promocao[];

  @OneToMany(() => Pedido, pedido => pedido.farmacia)
  pedidos: Pedido[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
