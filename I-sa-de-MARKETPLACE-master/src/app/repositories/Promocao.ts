import { FindOptionsWhere, Repository } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Promocao } from '../entities/Promocao';
import { IPromocao } from '../interfaces/promocao';
import { IPromocaoRepository } from '../interfaces/repositories/promocaoRepository';

export class PromocaoRepository implements IPromocaoRepository {
  private repository: Repository<Promocao>;

  constructor() {
    this.repository = dataSource.getRepository(Promocao);
  }

  async save(data: IPromocao & { farmacia: { farmacia_id: number }, }) {
    const promocao = this.repository.create({ ...data, farmacia: { id: data.farmacia.farmacia_id }, });
    return await this.repository.save(promocao);
  }

  async findAll(): Promise<Promocao[]> {
    return await this.repository.find({ relations: ['farmacia'] });
  }

  async findById(id: number): Promise<Promocao | null> {
    return await this.repository.findOne({ where: { id }, relations: ['farmacia'] });
  }

  async findByQuery(query: FindOptionsWhere<Promocao> & { skip: number; take: number; order: any; } | FindOptionsWhere<Promocao>[] & { skip: number; take: number; order: any; }): Promise<Promocao[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['farmacia'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['farmacia'] });
  }

  async findByQueryOne(query: FindOptionsWhere<Promocao> | FindOptionsWhere<Promocao>[]): Promise<Promocao | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['farmacia'] });
  }

  async update(id: number, data: Partial<IPromocao>): Promise<Promocao | null> {
    const promocao = await this.repository.findOneBy({ id });
    if (!promocao) return null;
    Object.assign(promocao, data);
    return await this.repository.save(promocao);
  }

  async delete(id: number): Promise<null> {
    const promocao = await this.repository.findOneBy({ id });
    if (!promocao) return null;
    await this.repository.remove(promocao);
    return null;
  }
}
