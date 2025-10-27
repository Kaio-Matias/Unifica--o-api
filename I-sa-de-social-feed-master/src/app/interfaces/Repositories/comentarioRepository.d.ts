import { FindOptionsWhere } from 'typeorm';
import { IComentario } from '../comentario';

export interface IComentarioRepository {
  save(data: IComentario): Promise<IComentario>;
  update(id: number, data: Partial<IComentario>): Promise<IComentario | null>;
  findById(id: number): Promise<IComentario | null>;
  findByQuery(query: FindOptionsWhere<IComentario> | FindOptionsWhere<IComentario>[]): Promise<IComentario[]>;
  findByQueryOne(query: FindOptionsWhere<IComentario> | FindOptionsWhere<IComentario>[]): Promise<IComentario | null>;
  findAll(): Promise<IComentario[]>;
  delete(id: number): Promise<null>;
}
