import { FindOptionsWhere } from 'typeorm';
import { IUser } from '../user';
import { User } from '../../entities/Users';

export interface IUserRepository {
  save(data: IUser): Promise<User>;
  update(id: number, data: IUser): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByQuery(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User[] | null>;
  findByQueryOne(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: number): Promise<null>;
}
