import { FindOptionsWhere } from 'typeorm';
import { ICategoriaPostagem } from '../categoriaPostagem';

export interface ICategoriaPostagemRepository {
  save(data: ICategoriaPostagem): Promise<ICategoriaPostagem>;
  update(id: number, data: Partial<ICategoriaPostagem>): Promise<ICategoriaPostagem | null>;
  findById(id: number): Promise<ICategoriaPostagem | null>;
  findByQuery(query: FindOptionsWhere<ICategoriaPostagem> | FindOptionsWhere<ICategoriaPostagem>[]): Promise<ICategoriaPostagem[]>;
  findByQueryOne(query: FindOptionsWhere<ICategoriaPostagem> | FindOptionsWhere<ICategoriaPostagem>[]): Promise<ICategoriaPostagem | null>;
  findAll(): Promise<ICategoriaPostagem[]>;
  delete(id: number): Promise<null>;
}
