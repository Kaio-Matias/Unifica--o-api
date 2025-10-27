import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PharmacyProduct } from './PharmacyProduct';

@Entity('medicamentos')
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  principio_ativo: string;

  @Column({ length: 50, nullable: true })
  tarja: string;

  @Column({ default: false })
  controlado: boolean;

  @Column({ default: false })
  receita_obrig: boolean;

  @OneToMany(() => PharmacyProduct, produto => produto.medicamento)
  produtos: PharmacyProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
