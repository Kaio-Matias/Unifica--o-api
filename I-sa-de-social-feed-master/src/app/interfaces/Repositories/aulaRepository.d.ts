import { FindOptionsWhere } from 'typeorm';
import { IAula } from '../aula';

export interface IAulaRepository {
  save(data: IAula): Promise<IAula>;
  findAll(): Promise<IAula[]>;
  findById(id_aula: number): Promise<IAula | null>;
  findByQuery(query: FindOptionsWhere<IAula> | FindOptionsWhere<IAula>[]): Promise<IAula[]>;
  findByQueryOne(query: FindOptionsWhere<IAula> | FindOptionsWhere<IAula>[]): Promise<IAula | null>;
  update(id_aula: number, data: Partial<IAula>): Promise<IAula | null>;
  delete(id_aula: number): Promise<null>;
}
