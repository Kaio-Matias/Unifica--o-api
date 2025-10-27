import { FindOptionsWhere } from 'typeorm';
import { IProfissionalDetalhes } from '../profissionalDetalhes';

export interface IProfissionalDetalhesRepository {
  save(data: IProfissionalDetalhes): Promise<IProfissionalDetalhes>;
  update(id: number, data: Partial<IProfissionalDetalhes>): Promise<IProfissionalDetalhes | null>;
  findById(id: number): Promise<IProfissionalDetalhes | null>;
  findByQuery(query: FindOptionsWhere<IProfissionalDetalhes> | FindOptionsWhere<IProfissionalDetalhes>[]): Promise<IProfissionalDetalhes[]>;
  findByQueryOne(query: FindOptionsWhere<IProfissionalDetalhes> | FindOptionsWhere<IProfissionalDetalhes>[]): Promise<IProfissionalDetalhes | null>;
  findAll(): Promise<IProfissionalDetalhes[]>;
  delete(id: number): Promise<null>;
}
