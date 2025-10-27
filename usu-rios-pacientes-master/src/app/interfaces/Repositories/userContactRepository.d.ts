import { FindOptionsWhere } from 'typeorm';
import { IUsuariosContatos } from '../usuariosContato';
import { IContato } from '../contato';
import { IUser } from '../user';
import { Contato } from '@models/Contatos';
import { User } from '@models/Users';

export interface IUsuariosContatosRepository {
  save(data: { usuario: User, contato: Contato }): Promise<IUsuariosContatos>;
  update(id: number, data: Partial<IUsuariosContatos>): Promise<IUsuariosContatos | null>;
  findById(id: number): Promise<IUsuariosContatos | null>;
  findByQuery(query: FindOptionsWhere<IUsuariosContatos> | FindOptionsWhere<IUsuariosContatos>[]): Promise<IUsuariosContatos[]>;
  findByQueryOne(query: FindOptionsWhere<IUsuariosContatos> | FindOptionsWhere<IUsuariosContatos>[]): Promise<IUsuariosContatos | null>;
  findAll(): Promise<IUsuariosContatos[]>;
  delete(id: number): Promise<null>;
}
