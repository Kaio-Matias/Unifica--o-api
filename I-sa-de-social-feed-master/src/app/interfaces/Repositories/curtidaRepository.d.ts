import { FindOptionsWhere } from 'typeorm';
import { ICurtida } from '../curtida';

export interface ICurtidaRepository {
  save(data: ICurtida): Promise<ICurtida>;
  update(id: number, data: Partial<ICurtida>): Promise<ICurtida | null>;
  findById(id: number): Promise<ICurtida | null>;
  findByQuery(query: FindOptionsWhere<ICurtida> | FindOptionsWhere<ICurtida>[]): Promise<ICurtida[]>;
  findByQueryOne(query: FindOptionsWhere<ICurtida> | FindOptionsWhere<ICurtida>[]): Promise<ICurtida | null>;
  findAll(): Promise<ICurtida[]>;
  delete(id: number): Promise<null>;
}
