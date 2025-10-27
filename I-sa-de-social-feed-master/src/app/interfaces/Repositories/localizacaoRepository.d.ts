import { FindOptionsWhere } from 'typeorm';
import { ILocalizacao } from '../localizacao';
import { Localizacao } from '../../entities';

export interface ILocalizacaoRepository {
  save(data: ILocalizacao): Promise<Localizacao>;
  update(id: number, data: Partial<ILocalizacao>): Promise<Localizacao | null>;
  findById(id: number): Promise<Localizacao | null>;
  findByQuery(query: FindOptionsWhere<ILocalizacao> | FindOptionsWhere<ILocalizacao>[]): Promise<Localizacao[]>;
  findByQueryOne(query: FindOptionsWhere<ILocalizacao> | FindOptionsWhere<ILocalizacao>[]): Promise<Localizacao | null>;
  findAll(): Promise<Localizacao[] | null>;
  delete(id: number): Promise<null>;
}
