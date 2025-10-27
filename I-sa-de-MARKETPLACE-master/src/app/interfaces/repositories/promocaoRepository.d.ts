import { FindOptionsWhere } from 'typeorm';
import { IPromocao } from '../promocao';
import { Promocao } from '../../entities';

export interface IPromocaoRepository {
  save(data: IPromocao): Promise<Promocao>;
  update(id: number, data: IPromocao): Promise<Promocao | null>;
  findById(id: number): Promise<Promocao | null>;
  findByQuery(query: FindOptionsWhere<Promocao> | FindOptionsWhere<Promocao>[]): Promise<Promocao[] | null>;
  findByQueryOne(query: FindOptionsWhere<Promocao> | FindOptionsWhere<Promocao>[]): Promise<Promocao | null>;
  findAll(): Promise<Promocao[]>;
  delete(id: number): Promise<null>;
}
