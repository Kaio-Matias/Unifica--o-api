import { FindOptionsWhere } from 'typeorm';
import { IReceitaDigital } from '../receitaDigital';
import { ReceitaDigital } from '../../entities';

export interface IReceitaDigitalRepository {
  save(data: IReceitaDigital): Promise<ReceitaDigital>;
  update(id: number, data: IReceitaDigital): Promise<ReceitaDigital | null>;
  findById(id: number): Promise<ReceitaDigital | null>;
  findByQuery(query: FindOptionsWhere<ReceitaDigital> | FindOptionsWhere<ReceitaDigital>[]): Promise<ReceitaDigital[] | null>;
  findByQueryOne(query: FindOptionsWhere<ReceitaDigital> | FindOptionsWhere<ReceitaDigital>[]): Promise<ReceitaDigital | null>;
  findAll(): Promise<ReceitaDigital[]>;
  delete(id: number): Promise<null>;
}
