import { Postagem } from '../../entities';
import { IPostagem } from '../postagem';
import { FindOptionsWhere } from 'typeorm';

export interface IPostagemRepository {
  save(data: IPostagem): Promise<Postagem>;
  update(id: number, data: Partial<IPostagem>): Promise<Postagem | null>;
  findById(id: number): Promise<Postagem | null>;
  findByQuery(query: FindOptionsWhere<Postagem> | FindOptionsWhere<Postagem>[]): Promise<Postagem[]>;
  findByQueryOne(query: FindOptionsWhere<Postagem> | FindOptionsWhere<Postagem>[]): Promise<Postagem | null>;
  findAll(order, limit, lastPostId): Promise<Postagem[]>;
  delete(id: number): Promise<null>;
}
