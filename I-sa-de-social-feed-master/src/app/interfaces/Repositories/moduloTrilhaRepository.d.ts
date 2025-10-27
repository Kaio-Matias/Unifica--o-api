import { FindOptionsWhere } from 'typeorm';
import { IModuloTrilha } from '../moduloTrilha';

export interface IModuloTrilhaRepository {
  save(data: IModuloTrilha): Promise<IModuloTrilha>;
  update(id: number, data: Partial<IModuloTrilha>): Promise<IModuloTrilha | null>;
  findById(id: number): Promise<IModuloTrilha | null>;
  findByQuery(query: FindOptionsWhere<IModuloTrilha> | FindOptionsWhere<IModuloTrilha>[]): Promise<IModuloTrilha[]>;
  findByQueryOne(query: FindOptionsWhere<IModuloTrilha> | FindOptionsWhere<IModuloTrilha>[]): Promise<IModuloTrilha | null>;
  findAll(): Promise<IModuloTrilha[]>;
  delete(id: number): Promise<null>;
}
