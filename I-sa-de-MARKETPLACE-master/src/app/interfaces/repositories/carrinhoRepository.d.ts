import { FindOptionsWhere } from 'typeorm';
import { ICarrinho,ICarrinhoItem } from '../carrinho';
import { Carrinho,CarrinhoItem } from '../../entities';

export interface ICarrinhoRepository {
  save(data: ICarrinho): Promise<Carrinho>;
  update(id: number, data: ICarrinho): Promise<Carrinho | null>;
  findById(id: number): Promise<Carrinho | null>;
  findByQuery(query: FindOptionsWhere<Carrinho> | FindOptionsWhere<Carrinho>[]): Promise<Carrinho[] | null>;
  findByQueryOne(query: FindOptionsWhere<Carrinho> | FindOptionsWhere<Carrinho>[]): Promise<Carrinho | null>;
  findAll(): Promise<Carrinho[]>;
  delete(id: number): Promise<null>;
}

export interface ICarrinhoItemRepository {
  save(data: ICarrinhoItem): Promise<CarrinhoItem>;
  update(id: number, data: Partial< ICarrinhoItem>): Promise<CarrinhoItem | null>;
  findById(id: number): Promise<CarrinhoItem | null>;
  findByQuery(query: FindOptionsWhere<CarrinhoItem> | FindOptionsWhere<CarrinhoItem>[]): Promise<CarrinhoItem[] | null>;
  findByQueryOne(query: FindOptionsWhere<CarrinhoItem> | FindOptionsWhere<CarrinhoItem>[]): Promise<CarrinhoItem | null>;
  findAll(): Promise<CarrinhoItem[]>;
  delete(id: number): Promise<null>;
}

