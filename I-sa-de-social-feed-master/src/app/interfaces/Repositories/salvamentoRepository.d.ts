import { FindOptionsWhere } from 'typeorm';
import { ISalvamento } from '../salvamento';

export interface ISalvamentoRepository {
  save(data: ISalvamento): Promise<ISalvamento>;
  update(id: number, data: Partial<ISalvamento>): Promise<ISalvamento | null>;
  findById(id: number): Promise<ISalvamento | null>;
  findByQuery(query: FindOptionsWhere<ISalvamento> | FindOptionsWhere<ISalvamento>[]): Promise<ISalvamento[]>;
  findByQueryOne(query: FindOptionsWhere<ISalvamento> | FindOptionsWhere<ISalvamento>[]): Promise<ISalvamento | null>;
  findAll(object): Promise<ISalvamento[]>;
  delete(id: number): Promise<null>;
}
