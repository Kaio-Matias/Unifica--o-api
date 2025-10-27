import { FindOptionsWhere } from 'typeorm';
import { IMedicamento } from '../medicamento';
import { Medicamento } from '../../entities';

export interface IMedicamentoRepository {
  save(data: IMedicamento): Promise<Medicamento>;
  update(id: number, data: IMedicamento): Promise<Medicamento | null>;
  findById(id: number): Promise<Medicamento | null>;
  findByQuery(query: FindOptionsWhere<Medicamento> | FindOptionsWhere<Medicamento>[]): Promise<Medicamento[] | null>;
  findByQueryOne(query: FindOptionsWhere<Medicamento> | FindOptionsWhere<Medicamento>[]): Promise<Medicamento | null>;
  findAll(): Promise<Medicamento[]>;
  delete(id: number): Promise<null>;
}

