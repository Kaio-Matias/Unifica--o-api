import { FindOptionsWhere } from 'typeorm';
import { IPagamento } from '../pagamento';
import { Pagamento } from '../../entities';

export interface IPagamentoRepository {
  save(data: IPagamento): Promise<Pagamento>;
  update(id: number, data: IPagamento): Promise<Pagamento | null>;
  findById(id: number): Promise<Pagamento | null>;
  findByQuery(query: FindOptionsWhere<Pagamento> | FindOptionsWhere<Pagamento>[]): Promise<Pagamento[] | null>;
  findByQueryOne(query: FindOptionsWhere<Pagamento> | FindOptionsWhere<Pagamento>[]): Promise<Pagamento | null>;
  findAll(): Promise<Pagamento[]>;
  delete(id: number): Promise<null>;
}
