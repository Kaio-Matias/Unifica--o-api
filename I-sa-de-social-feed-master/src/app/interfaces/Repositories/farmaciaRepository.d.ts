import { FindOptionsWhere } from 'typeorm';
import { IFarmacia } from '../farmacia';
import { Farmacia } from '../../entities';

export interface IFarmaciaRepository {
  save(data: IFarmacia): Promise<Farmacia>;
  update(cnpj: string, data: Partial<IFarmacia>): Promise<Farmacia | null>;
  findByCNPJ(cnpj: string): Promise<Farmacia | null>;
  findByQuery(query: any): Promise<Farmacia[]>;
  findByQueryOne(query: FindOptionsWhere<IFarmacia> | FindOptionsWhere<IFarmacia>[]): Promise<Farmacia | null>;
  findAll(query: any): Promise<IFarmacia[]>;
  delete(cnpj: string): Promise<null>;
}
