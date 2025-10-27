import { Repository, FindOptionsWhere } from 'typeorm';
import { Trilha } from '../entities/Trilhas';
import { ITrilha } from '../interfaces/trilha';
import { ITrilhaRepository } from '../interfaces/Repositories/trilhaRepository';
import dataSource from '../../database/typeorm';

export class TrilhaRepository implements ITrilhaRepository {
  private repository: Repository<Trilha>;

  constructor() {
    this.repository = dataSource.getRepository(Trilha);
  }

  async save(data: ITrilha): Promise<Trilha> {
    const trilha = this.repository.create(data);
    return await this.repository.save(trilha);
  }

  async update(id: number, data: Partial<ITrilha>): Promise<Trilha | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<Trilha | null> {
    return await this.repository.findOne({
      where: { id_trilha: id },
      relations: ['modulos', 'inscricoes'],
    });
  }

  async findByQuery(query: any): Promise<Trilha[]> {
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

    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({ where: { ...query }, relations: ['modulos', 'inscricoes'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['modulos', 'inscricoes'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<ITrilha> | FindOptionsWhere<ITrilha>[]): Promise<Trilha | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['modulos', 'inscricoes'],
    });
  }

  async findAll(): Promise<Trilha[]> {
    return await this.repository.find({ relations: ['modulos', 'inscricoes'] });
  }

  async delete(id: number): Promise<null> {
    const trilha = await this.findById(id);
    if (!trilha) return null;
    await this.repository.remove(trilha);
    return null;
  }
}
