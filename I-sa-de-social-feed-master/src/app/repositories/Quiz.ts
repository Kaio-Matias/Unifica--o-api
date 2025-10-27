import { Repository, FindOptionsWhere } from 'typeorm';
import { Quiz } from '../entities/Quiz';
import { IQuiz } from '../interfaces/quiz';
import { IQuizRepository } from '../interfaces/Repositories/quizRepository';
import dataSource from '../../database/typeorm';

export class QuizRepository implements IQuizRepository {
  private repository: Repository<Quiz>;

  constructor() {
    this.repository = dataSource.getRepository(Quiz);
  }

  async save(data: IQuiz & { aula: { id_aula: number } }): Promise<Quiz> {
    const quiz = this.repository.create(data);
    return await this.repository.save(quiz);
  }

  async update(id: number, data: Partial<IQuiz>): Promise<Quiz | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<Quiz | null> {
    return await this.repository.findOne({
      where: { id_quiz: id },
      relations: ['aula', 'questoes'],
    });
  }

  async findByQuery(query: any): Promise<Quiz[]> {
    const objectFilter = { skip: query.skip, take: query.take, order: query.order };

    if (!query.skip) {
      delete objectFilter.skip
    }
    if (!query.take) {
      delete objectFilter.take
    }
    if (!query.order) {
      delete objectFilter.order
    }
    delete query.skip;
    delete query.take;
    delete query.order;

    if ((objectFilter.skip || objectFilter.take || objectFilter.order) && Object.keys(query).length == 0) {
      return await this.repository.find({ ...objectFilter });
    }

    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({ where: { ...query }, relations: ['aula', 'questoes'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['aula', 'questoes'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IQuiz> | FindOptionsWhere<IQuiz>[]): Promise<Quiz | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['aula', 'questoes'],
    });
  }

  async findAll(): Promise<Quiz[]> {
    return await this.repository.find({ relations: ['aula', 'questoes'] });
  }

  async delete(id: number): Promise<null> {
    const quiz = await this.findById(id);
    if (!quiz) return null;
    await this.repository.remove(quiz);
    return null;
  }
}
