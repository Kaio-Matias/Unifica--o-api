import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('localizacao')
export class Localizacao {
  @PrimaryGeneratedColumn()
  id_localizacao: number;

  @Column()
  id_usuario: number;

  @Column('numeric', { precision: 9, scale: 6 })
  latitude: number;

  @Column('numeric', { precision: 9, scale: 6 })
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
