import { FindOptionsWhere } from 'typeorm';
import { IUnidadeSaude } from '../unidadeSaude';
import { UnidadeSaude } from '../../entities';

export interface IUnidadeSaudeRepository {
  save(data: IUnidadeSaude): Promise<IUnidadeSaude>;
  update(cnpj: string, data: Partial<IUnidadeSaude>): Promise<UnidadeSaude | null>;
  findByCNPJ(cnpj: string): Promise<IUnidadeSaude | null>;
  findByQuery(query: FindOptionsWhere<IUnidadeSaude> | FindOptionsWhere<IUnidadeSaude>[]): Promise<UnidadeSaude[]>;
  findByQueryOne(query: FindOptionsWhere<IUnidadeSaude> | FindOptionsWhere<IUnidadeSaude>[]): Promise<UnidadeSaude | null>;
  findAll(): Promise<IUnidadeSaude[]>;
  delete(cnpj: string): Promise<null>;
}
