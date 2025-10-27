import { FindOptionsWhere, Repository } from 'typeorm';
import { Pagamento } from '../entities/Pagamento';
import dataSource from '../../database/typeorm';
import { IPagamento } from '../interfaces/pagamento';
import { IPagamentoRepository } from '../interfaces/repositories/pagamentoRepository';

export class PagamentoRepository implements IPagamentoRepository {
  private repository: Repository<Pagamento>;

  constructor() {
    this.repository = dataSource.getRepository(Pagamento);
  }

  async save(data: IPagamento & { pedido: { id: number } }) {
    const pagamento = this.repository.create(data);
    return await this.repository.save(pagamento);
  }

  async findAll(): Promise<Pagamento[]> {
    return await this.repository.find({ relations: ['pedido'] });
  }

  async findById(id: number): Promise<Pagamento | null> {
    return await this.repository.findOne({ where: { id }, relations: ['pedido'] });
  }

  async findByQuery(query: FindOptionsWhere<Pagamento> & { skip: number; take: number; order: any; } | FindOptionsWhere<Pagamento>[] & { skip: number; take: number; order: any; }): Promise<Pagamento[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['pedidos'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['pedido'] });
  }

  async findByQueryOne(query: FindOptionsWhere<Pagamento> | FindOptionsWhere<Pagamento>[]): Promise<Pagamento | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['pedido'] });
  }

  async update(id: number, data: Partial<IPagamento>): Promise<Pagamento | null> {
    const pagamento = await this.repository.findOneBy({ id });
    if (!pagamento) return null;
    Object.assign(pagamento, data);
    return await this.repository.save(pagamento);
  }

  async delete(id: number): Promise<null> {
    const pagamento = await this.repository.findOneBy({ id });
    if (!pagamento) return null;
    await this.repository.remove(pagamento);
    return null;
  }
}
