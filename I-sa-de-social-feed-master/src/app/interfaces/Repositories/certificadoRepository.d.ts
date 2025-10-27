import { FindOptionsWhere } from 'typeorm';
import { ICertificado } from '../certificado';

export interface ICertificadoRepository {
  save(data: ICertificado): Promise<ICertificado>;
  update(id: number, data: Partial<ICertificado>): Promise<ICertificado | null>;
  findById(id: number): Promise<ICertificado | null>;
  findByQuery(query: FindOptionsWhere<ICertificado> | FindOptionsWhere<ICertificado>[]): Promise<ICertificado[]>;
  findByQueryOne(query: FindOptionsWhere<ICertificado> | FindOptionsWhere<ICertificado>[]): Promise<ICertificado | null>;
  findAll(): Promise<ICertificado[]>;
  delete(id: number): Promise<null>;
}
