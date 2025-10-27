import { FindOptionsWhere, Repository } from 'typeorm';
import dataSource from '../../database/typeorm';
import { PharmacyProduct } from '../entities/PharmacyProduct';
import { IPharmacyProduct } from '../interfaces/pharmacy';
import { IPharmacyProductRepository } from '../interfaces/repositories/pharmacyRepository';

export class PharmacyProductRepository implements IPharmacyProductRepository {
  private repository: Repository<PharmacyProduct>;

  constructor() {
    this.repository = dataSource.getRepository(PharmacyProduct);
  }

  async save(data: IPharmacyProduct & { farmacia: { farmacia_id: number; }, medicamento: { medicamento_id: number } }) {
    const produto = this.repository.create({
      ...data,
      farmacia: { id: data.farmacia.farmacia_id },
      medicamento: { id: data.medicamento.medicamento_id },
    });
    return await this.repository.save(produto);
  }

  async findAll(): Promise<PharmacyProduct[]> {
    return await this.repository.find({ relations: ['farmacia', 'medicamento'] });
  }

  async findById(id: number): Promise<PharmacyProduct | null> {
    return await this.repository.findOne({ where: { id }, relations: ['farmacia', 'medicamento'] });
  }

  async findByQuery(query: FindOptionsWhere<PharmacyProduct> & { skip: number; take: number; order: any; } | FindOptionsWhere<PharmacyProduct>[] & { skip: number; take: number; order: any; }): Promise<PharmacyProduct[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['farmacia', 'medicamento'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['farmacia', 'medicamento'] });
  }

  async findByQueryOne(query: FindOptionsWhere<PharmacyProduct> | FindOptionsWhere<PharmacyProduct>[]): Promise<PharmacyProduct | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['farmacia', 'medicamento'] });
  }

  async update(id: number, data: Partial<IPharmacyProduct>): Promise<PharmacyProduct | null> {
    const produto = await this.repository.findOneBy({ id });
    if (!produto) return null;
    Object.assign(produto, data);
    return await this.repository.save(produto);
  }

  async delete(id: number): Promise<null> {
    const produto = await this.repository.findOneBy({ id });
    if (!produto) return null;
    await this.repository.remove(produto);
    return null;
  }
}
