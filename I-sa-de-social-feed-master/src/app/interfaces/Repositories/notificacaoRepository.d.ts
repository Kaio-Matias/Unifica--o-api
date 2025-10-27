import { FindOptionsWhere } from 'typeorm';
import { INotificacao } from '../notificacao';

export interface INotificacaoRepository {
  save(data: INotificacao): Promise<INotificacao>;
  update(id: number, data: Partial<INotificacao>): Promise<INotificacao | null>;
  findById(id: number): Promise<INotificacao | null>;
  findByQuery(query: FindOptionsWhere<INotificacao> | FindOptionsWhere<INotificacao>[]): Promise<INotificacao[]>;
  findByQueryOne(query: FindOptionsWhere<INotificacao> | FindOptionsWhere<INotificacao>[]): Promise<INotificacao | null>;
  findAll(order, limit, lastPostId): Promise<INotificacao[]>;
  delete(id: number): Promise<null>;
}
