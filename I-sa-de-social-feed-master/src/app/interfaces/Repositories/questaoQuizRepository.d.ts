import { FindOptionsWhere } from 'typeorm';
import { IQuestaoQuiz } from '../questaoQuiz';

export interface IQuestaoQuizRepository {
  save(data: IQuestaoQuiz): Promise<IQuestaoQuiz>;
  update(id: number, data: Partial<IQuestaoQuiz>): Promise<IQuestaoQuiz | null>;
  findById(id: number): Promise<IQuestaoQuiz | null>;
  findByQuery(query: FindOptionsWhere<IQuestaoQuiz> | FindOptionsWhere<IQuestaoQuiz>[]): Promise<IQuestaoQuiz[]>;
  findByQueryOne(query: FindOptionsWhere<IQuestaoQuiz> | FindOptionsWhere<IQuestaoQuiz>[]): Promise<IQuestaoQuiz | null>;
  findAll(): Promise<IQuestaoQuiz[]>;
  delete(id: number): Promise<null>;
}
