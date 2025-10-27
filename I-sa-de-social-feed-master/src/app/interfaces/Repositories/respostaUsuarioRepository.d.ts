import { FindOptionsWhere } from 'typeorm';
import { IRespostaUsuario } from '../respostaUsuario';

export interface IRespostaUsuarioRepository {
  save(data: IRespostaUsuario): Promise<IRespostaUsuario>;
  update(id: number, data: Partial<IRespostaUsuario>): Promise<IRespostaUsuario | null>;
  findById(id: number): Promise<IRespostaUsuario | null>;
  findByQuery(query: FindOptionsWhere<IRespostaUsuario> | FindOptionsWhere<IRespostaUsuario>[]): Promise<IRespostaUsuario[]>;
  findByQueryOne(query: FindOptionsWhere<IRespostaUsuario> | FindOptionsWhere<IRespostaUsuario>[]): Promise<IRespostaUsuario | null>;
  findAll(): Promise<IRespostaUsuario[]>;
  delete(id: number): Promise<null>;
}
