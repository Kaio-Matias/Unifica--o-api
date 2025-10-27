import { FindOptionsWhere } from 'typeorm';
import { IProgressoAula } from '../progressoAula';

export interface IProgressoAulaRepository {
  save(data: IProgressoAula): Promise<IProgressoAula>;
  update(id: number, data: Partial<IProgressoAula>): Promise<IProgressoAula | null>;
  findById(id: number): Promise<IProgressoAula | null>;
  findByQuery(query: FindOptionsWhere<IProgressoAula> | FindOptionsWhere<IProgressoAula>[]): Promise<IProgressoAula[]>;
  findByQueryOne(query: FindOptionsWhere<IProgressoAula> | FindOptionsWhere<IProgressoAula>[]): Promise<IProgressoAula | null>;
  findAll(): Promise<IProgressoAula[]>;
  delete(id: number): Promise<null>;
}
