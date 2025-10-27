import { FindOptionsWhere } from 'typeorm';
import { ITrilha } from '../trilha';

export interface ITrilhaRepository {
  save(data: ITrilha): Promise<ITrilha>;
  update(id: number, data: Partial<ITrilha>): Promise<ITrilha | null>;
  findById(id: number): Promise<ITrilha | null>;
  findByQuery(query: FindOptionsWhere<ITrilha> | FindOptionsWhere<ITrilha>[]): Promise<ITrilha[]>;
  findByQueryOne(query: FindOptionsWhere<ITrilha> | FindOptionsWhere<ITrilha>[]): Promise<ITrilha | null>;
  findAll(): Promise<ITrilha[]>;
  delete(id: number): Promise<null>;
}
