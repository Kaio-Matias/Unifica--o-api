import { FindOptionsWhere } from 'typeorm';
import { IContato } from '../contato';

export interface IContatoRepository {
  save(data: IContato): Promise<IContato>;
  update(id: number, data: Partial<IContato>): Promise<IContato | null>;
  findById(id: number): Promise<IContato | null>;
  findByQuery(query: FindOptionsWhere<IContato> | FindOptionsWhere<IContato>[]): Promise<IContato[]>;
  findByQueryOne(query: FindOptionsWhere<IContato> | FindOptionsWhere<IContato>[]): Promise<IContato | null>;
  findAll(): Promise<IContato[]>;
  delete(id: number): Promise<null>;
}
