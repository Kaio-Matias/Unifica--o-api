import { Repository, FindOptionsWhere } from 'typeorm';
import { Aula } from '../entities/Aulas';
import { IAula } from '../interfaces/aula';
import { IAulaRepository } from '../interfaces/Repositories/aulaRepository';
import dataSource from '../../database/typeorm';

export class AulaRepository implements IAulaRepository {
  private repository: Repository<Aula>;

  constructor() {
    this.repository = dataSource.getRepository(Aula);
  }

  async save(data: IAula & { modulo: { id_modulo: number } }): Promise<Aula> {
    const aula = this.repository.create(data);
    return await this.repository.save(aula);
  }

  async update(id: number, data: Partial<IAula>): Promise<Aula | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<Aula | null> {
    return await this.repository.findOne({
      where: { id_aula: id },
      relations: ['modulo', 'quizzes', 'progressos'],
    });
  }

  async findByQuery(query: any): Promise<Aula[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['modulo', 'quizzes', 'progressos'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['modulo', 'quizzes', 'progressos'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IAula> | FindOptionsWhere<IAula>[]): Promise<Aula | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['modulo', 'quizzes', 'progressos'],
    });
  }

  async findAll(): Promise<Aula[]> {
    return await this.repository.find({
      relations: ['modulo', 'quizzes', 'progressos'],
    });
  }

  async delete(id: number): Promise<null> {
    const aula = await this.findById(id);
    if (!aula) return null;
    await this.repository.remove(aula);
    return null;
  }
}
