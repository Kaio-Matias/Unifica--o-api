// src/repositories/PedidoItemRepository.ts

import { FindOptionsWhere, Repository } from 'typeorm';
import dataSource from '../../database/typeorm';
import { PedidoItem } from '../entities/PedidoItems';

export class PedidoItemRepository {
  private repository: Repository<PedidoItem>;

  constructor() {
    this.repository = dataSource.getRepository(PedidoItem);
  }

  async save(data: Partial<PedidoItem>) {
    const item = this.repository.create(data);
    return await this.repository.save(item);
  }

  async saveMany(data: Partial<PedidoItem>[]) {
    const items = this.repository.create(data);
    return await this.repository.save(items);
  }

  async findAll(): Promise<PedidoItem[]> {
    return await this.repository.find({ relations: ['pedido', 'produto'] });
  }

  async findById(id: number): Promise<PedidoItem | null> {
    return await this.repository.findOne({ where: { id }, relations: ['pedido', 'produto'] });
  }

  async findByQuery(query: FindOptionsWhere<PedidoItem> & { skip?: number; take?: number; order?: any } | FindOptionsWhere<PedidoItem>[] & { skip?: number; take?: number; order?: any }): Promise<PedidoItem[]> {
    const objectFilter = { skip: query.skip, take: query.take, order: query.order };

    if (!query.skip) delete objectFilter.skip;
    if (!query.take) delete objectFilter.take;
    if (!query.order) delete objectFilter.order;

    delete query.skip;
    delete query.take;
    delete query.order;

    if ((objectFilter.skip || objectFilter.take || objectFilter.order) && Object.keys(query).length === 0) {
      return await this.repository.find({ ...objectFilter, relations: ['pedido', 'produto'] });
    }

    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({ where: { ...query }, relations: ['pedido', 'produto'], ...objectFilter });
    }

    return await this.repository.find({ where: { ...query }, relations: ['pedido', 'produto'] });
  }

  async findByQueryOne(query: FindOptionsWhere<PedidoItem> | FindOptionsWhere<PedidoItem>[]): Promise<PedidoItem | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['pedido', 'produto'] });
  }

  async update(id: number, data: Partial<PedidoItem>): Promise<PedidoItem | null> {
    const item = await this.repository.findOneBy({ id });
    if (!item) return null;

    Object.assign(item, data);
    return await this.repository.save(item);
  }

  async delete(id: number): Promise<null> {
    const item = await this.repository.findOneBy({ id });
    if (!item) return null;
    await this.repository.remove(item);
    return null;
  }
}
