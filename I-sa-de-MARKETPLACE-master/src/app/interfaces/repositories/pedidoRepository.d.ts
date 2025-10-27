import { FindOptionsWhere } from 'typeorm';
import { IPedido } from '../pedido';
import { Pedido } from '../../entities';

export interface IPedidoRepository {
  save(data: IPedido): Promise<Pedido>;
  update(id: number, data: IPedido): Promise<Pedido | null>;
  findById(id: number): Promise<Pedido | null>;
  findByQuery(query: FindOptionsWhere<Pedido> | FindOptionsWhere<Pedido>[]): Promise<Pedido[] | null>;
  findByQueryOne(query: FindOptionsWhere<Pedido> | FindOptionsWhere<Pedido>[]): Promise<Pedido | null>;
  findAll(): Promise<Pedido[]>;
  delete(id: number): Promise<null>;
}
