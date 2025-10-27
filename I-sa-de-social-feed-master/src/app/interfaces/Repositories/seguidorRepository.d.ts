import { FindOptionsWhere } from 'typeorm';
import { ISeguidor } from '../seguidor';

export interface ISeguidorRepository {
  save(data: ISeguidor): Promise<ISeguidor>;
  update(id: number, data: Partial<ISeguidor>): Promise<ISeguidor | null>;
  findById(id: number): Promise<ISeguidor | null>;
  findByQuery(query: FindOptionsWhere<ISeguidor> | FindOptionsWhere<ISeguidor>[]): Promise<ISeguidor[]>;
  findByQueryOne(query: FindOptionsWhere<ISeguidor> | FindOptionsWhere<ISeguidor>[]): Promise<ISeguidor | null>;
  findAll(): Promise<ISeguidor[]>;
  delete(id: number): Promise<null>;
}
