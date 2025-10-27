import { FindOptionsWhere, Repository } from 'typeorm';
import dataSource from '../../database/typeorm';
import { ReceitaDigital } from '../entities/ReceitaDigital';
import { IReceitaDigital } from '../interfaces/receitaDigital';
import { IReceitaDigitalRepository } from '../interfaces/repositories/receitaDigitalRepository';

export class ReceitaDigitalRepository implements IReceitaDigitalRepository {
  private repository: Repository<ReceitaDigital>;

  constructor() {
    this.repository = dataSource.getRepository(ReceitaDigital);
  }

  async save(data: IReceitaDigital) {
    const receita = this.repository.create(data);
    return await this.repository.save(receita);
  }

  async findAll(): Promise<ReceitaDigital[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<ReceitaDigital | null> {
    return await this.repository.findOne({ where: { id }, });
  }

  async findByQuery(query: FindOptionsWhere<ReceitaDigital> & { skip: number; take: number; order: any; } | FindOptionsWhere<ReceitaDigital>[] & { skip: number; take: number; order: any; }): Promise<ReceitaDigital[]> {
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
      return await this.repository.find({ where: { ...query }, ...objectFilter });
    }
    return await this.repository.find({ where: { ...query } });
  }

  async findByQueryOne(query: FindOptionsWhere<ReceitaDigital> | FindOptionsWhere<ReceitaDigital>[]): Promise<ReceitaDigital | null> {
    return await this.repository.findOne({ where: { ...query } });
  }

  async update(id: number, data: Partial<IReceitaDigital>): Promise<ReceitaDigital | null> {
    const receita = await this.repository.findOneBy({ id });
    if (!receita) return null;
    Object.assign(receita, data);
    return await this.repository.save(receita);
  }

  async delete(id: number): Promise<null> {
    const receita = await this.repository.findOneBy({ id });
    if (!receita) return null;
    await this.repository.remove(receita);
    return null;
  }
}
