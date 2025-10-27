import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId } from 'typeorm';
import { Pharmacy } from './Pharmacy';

@Entity('promocoes')
export class Promocao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pharmacy, farmacia => farmacia.promocoes)
  @JoinColumn({ name: 'farmacia_id' })
  farmacia: Pharmacy;

  @RelationId((promocao: Promocao) => promocao.farmacia)
  farmacia_id: number;

  @Column({ length: 255 })
  titulo: string;

  @Column('text', { nullable: true })
  descricao: string;

  @Column('timestamp')
  inicio: Date;

  @Column('timestamp')
  fim: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
