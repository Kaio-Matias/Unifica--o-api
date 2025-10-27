import { FindOptionsWhere } from 'typeorm';
import { IQuiz } from '../quiz';

export interface IQuizRepository {
  save(data: IQuiz): Promise<IQuiz>;
  update(id: number, data: Partial<IQuiz>): Promise<IQuiz | null>;
  findById(id: number): Promise<IQuiz | null>;
  findByQuery(query: FindOptionsWhere<IQuiz> | FindOptionsWhere<IQuiz>[]): Promise<IQuiz[]>;
  findByQueryOne(query: FindOptionsWhere<IQuiz> | FindOptionsWhere<IQuiz>[]): Promise<IQuiz | null>;
  findAll(): Promise<IQuiz[]>;
  delete(id: number): Promise<null>;
}
