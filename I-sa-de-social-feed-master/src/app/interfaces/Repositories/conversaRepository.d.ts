import { FindOptionsWhere } from 'typeorm';
import { IConversa } from '../conversa';

export interface IConversaRepository {
  save(data: IConversa): Promise<IConversa>;
  update(id: number, data: Partial<IConversa>): Promise<IConversa | null>;
  findById(id: number): Promise<IConversa | null>;
  findByQuery(query: FindOptionsWhere<IConversa> | FindOptionsWhere<IConversa>[]): Promise<IConversa[]>;
  findByQueryOne(query: FindOptionsWhere<IConversa> | FindOptionsWhere<IConversa>[]): Promise<IConversa | null>;
  findAll(): Promise<IConversa[]>;
  delete(id: number): Promise<null>;
}
