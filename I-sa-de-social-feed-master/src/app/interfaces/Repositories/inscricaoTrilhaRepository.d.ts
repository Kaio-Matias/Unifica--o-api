import { FindOptionsWhere } from 'typeorm';
import { IInscricaoTrilha } from '../inscricaoTrilha';
import { InscricaoTrilha } from '../../entities';

export interface IInscricaoTrilhaRepository {
  save(data: IInscricaoTrilha): Promise<IInscricaoTrilha>;
  update(id: number, data: Partial<IInscricaoTrilha>): Promise<InscricaoTrilha | null>;
  findById(id: number): Promise<IInscricaoTrilha | null>;
  findByQuery(query: FindOptionsWhere<IInscricaoTrilha> | FindOptionsWhere<IInscricaoTrilha>[]): Promise<InscricaoTrilha[]>;
  findByQueryOne(query: FindOptionsWhere<IInscricaoTrilha> | FindOptionsWhere<IInscricaoTrilha>[]): Promise<InscricaoTrilha | null>;
  findAll(): Promise<IInscricaoTrilha[]>;
  delete(id: number): Promise<null>;
}
