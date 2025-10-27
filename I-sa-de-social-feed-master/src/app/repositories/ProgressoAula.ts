import { FindOptionsWhere, Repository } from 'typeorm';
import { ProgressoAula } from '../entities/ProgressoAula';
import { IProgressoAula } from '../interfaces/progressoAula';
import { IProgressoAulaRepository } from '../interfaces/Repositories/progressoAulaRepository';
import dataSource from '../../database/typeorm';

export class ProgressoAulaRepository implements IProgressoAulaRepository {
  private repository: Repository<ProgressoAula>;

  constructor() {
    this.repository = dataSource.getRepository(ProgressoAula);
  }

  async save(data: IProgressoAula & { inscricao: { id_inscricao: number }, aula: { id_aula: number } }): Promise<ProgressoAula> {
    const progresso = this.repository.create(data);
    return await this.repository.save(progresso);
  }

  async update(id: number, data: Partial<IProgressoAula>): Promise<ProgressoAula | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<ProgressoAula | null> {
    return await this.repository.findOne({
      where: { id_progresso: id },
      relations: ['inscricao', 'aula'],
    });
  }

  async findByQuery(query: any): Promise<ProgressoAula[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['inscricao', 'aula'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['inscricao', 'aula'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IProgressoAula> | FindOptionsWhere<IProgressoAula>[]): Promise<ProgressoAula | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['inscricao', 'aula'],
    });
  }

  async findAll(): Promise<ProgressoAula[]> {
    return await this.repository.find({
      relations: ['inscricao', 'aula'],
    });
  }

  async delete(id: number): Promise<null> {
    const progresso = await this.findById(id);
    if (!progresso) return null;
    await this.repository.remove(progresso);
    return null;
  }
}
