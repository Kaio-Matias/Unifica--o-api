import { FindOptionsWhere, Repository } from 'typeorm';
import { Medicamento } from '../entities/Medicamento';
import dataSource from '../../database/typeorm';
import { IMedicamento } from '../interfaces/medicamento';
import { IMedicamentoRepository } from '../interfaces/repositories/medicamentoRepository';

export class MedicamentoRepository implements IMedicamentoRepository {
  private repository: Repository<Medicamento>;

  constructor() {
    this.repository = dataSource.getRepository(Medicamento);
  }

  async save(data: IMedicamento) {
    const medicamento = this.repository.create(data);
    return await this.repository.save(medicamento);
  }

  async findAll(): Promise<Medicamento[]> {
    return await this.repository.find({ relations: ['produtos'] });
  }

  async findById(id: number): Promise<Medicamento | null> {
    return await this.repository.findOne({ where: { id }, relations: ['produtos'] });
  }

  async findByQuery(query: FindOptionsWhere<Medicamento> & { skip: number; take: number; order: any; } | FindOptionsWhere<Medicamento>[] & { skip: number; take: number; order: any; }): Promise<Medicamento[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['produtos'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['produtos'] });
  }

  async findByQueryOne(query: FindOptionsWhere<Medicamento> | FindOptionsWhere<Medicamento>[]): Promise<Medicamento | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['produtos'] });
  }

  async update(id: number, data: IMedicamento): Promise<Medicamento | null> {
    const medicamento = await this.repository.findOneBy({ id });
    if (!medicamento) return null;

    Object.assign(medicamento, data);
    return await this.repository.save(medicamento);
  }

  async delete(id: number): Promise<null> {
    const medicamento = await this.repository.findOneBy({ id });
    if (!medicamento) return null;
    await this.repository.remove(medicamento);
    return null;
  }
}
