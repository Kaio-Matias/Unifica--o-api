import { FindOptionsWhere } from 'typeorm';
import { IEndereco } from '../endereco';

export interface IEnderecoRepository {
  save(data: IEndereco): Promise<IEndereco>;
  update(id: number, data: Partial<IEndereco>): Promise<IEndereco | null>;
  findById(id: number): Promise<IEndereco | null>;
  findByQuery(query: FindOptionsWhere<IEndereco> | FindOptionsWhere<IEndereco>[]): Promise<IEndereco[]>;
  findByQueryOne(query: FindOptionsWhere<IEndereco> | FindOptionsWhere<IEndereco>[]): Promise<IEndereco | null>;
  findAll(): Promise<IEndereco[]>;
  delete(id: number): Promise<null>;
}
