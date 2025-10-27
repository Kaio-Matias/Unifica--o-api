import { FindOptionsWhere, Repository } from 'typeorm';
import { QuestaoQuiz } from '../entities/QuestaoQuiz';
import { IQuestaoQuiz } from '../interfaces/questaoQuiz';
import { IQuestaoQuizRepository } from '../interfaces/Repositories/questaoQuizRepository';
import dataSource from '../../database/typeorm';

export class QuestaoQuizRepository implements IQuestaoQuizRepository {
  private repository: Repository<QuestaoQuiz>;

  constructor() {
    this.repository = dataSource.getRepository(QuestaoQuiz);
  }

  async save(data: IQuestaoQuiz & { quiz: { id_quiz: number } }): Promise<QuestaoQuiz> {
    const questao = this.repository.create(data);
    return await this.repository.save(questao);
  }

  async update(id: number, data: Partial<IQuestaoQuiz>): Promise<QuestaoQuiz | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<QuestaoQuiz | null> {
    return await this.repository.findOne({
      where: { id_questao: id },
      relations: ['quiz'],
    });
  }

  async findByQuery(query: any): Promise<QuestaoQuiz[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['quiz'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['quiz'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IQuestaoQuiz> | FindOptionsWhere<IQuestaoQuiz>[]): Promise<QuestaoQuiz | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['quiz'],
    });
  }

  async findAll(): Promise<QuestaoQuiz[]> {
    return await this.repository.find({ relations: ['quiz'] });
  }

  async delete(id: number): Promise<null> {
    const questao = await this.findById(id);
    if (!questao) return null;
    await this.repository.remove(questao);
    return null;
  }
}
