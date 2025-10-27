import { FindOptionsWhere, Repository } from 'typeorm';
import { Pedido } from '../entities/Pedido';
import dataSource from '../../database/typeorm';
import { IPedido } from '../interfaces/pedido';
import { IPedidoRepository } from '../interfaces/repositories/pedidoRepository';

export class PedidoRepository implements IPedidoRepository {
  private repository: Repository<Pedido>;

  constructor() {
    this.repository = dataSource.getRepository(Pedido);
  }

  async save(data: IPedido & { farmacia: { farmacia_id: number }, }) {
    const pedido = this.repository.create({ ...data, farmacia: { id: data.farmacia.farmacia_id }, });
    return await this.repository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return await this.repository.find({ relations: ['farmacia', 'pagamentos'] });
  }

  async findById(id: number): Promise<Pedido | null> {
    return await this.repository.findOne({ where: { id }, relations: ['farmacia', 'pagamentos'] });
  }

  async findByQuery(query: FindOptionsWhere<Pedido> & { skip: number; take: number; order: any; } | FindOptionsWhere<Pedido>[] & { skip: number; take: number; order: any; }): Promise<Pedido[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['farmacia', 'pagamentos'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['farmacia', 'pagamentos'] });
  }

  async findByQueryOne(query: FindOptionsWhere<Pedido> | FindOptionsWhere<Pedido>[]): Promise<Pedido | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['farmacia', 'pagamentos'] });
  }

  async update(id: number, data: Partial<IPedido>): Promise<Pedido | null> {
    const pedido = await this.repository.findOneBy({ id });
    if (!pedido) return null;
    Object.assign(pedido, data);
    return await this.repository.save(pedido);
  }

  async delete(id: number): Promise<null> {
    const pedido = await this.repository.findOneBy({ id });
    if (!pedido) return null;
    await this.repository.remove(pedido);
    return null;
  }
}
