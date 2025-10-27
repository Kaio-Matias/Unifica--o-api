import { FindOptionsWhere, Repository } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Pharmacy } from '../entities/Pharmacy';
import { IPharmacy } from '../interfaces/pharmacy';
import { IPharmacyRepository } from '../interfaces/repositories/pharmacyRepository';

export class PharmacyRepository implements IPharmacyRepository {
  private repository: Repository<Pharmacy>;

  constructor() {
    this.repository = dataSource.getRepository(Pharmacy);
  }

  async save(data: IPharmacy) {
    const pharmacy = this.repository.create(data);
    return await this.repository.save(pharmacy);
  }

  async findAll(): Promise<Pharmacy[]> {
    return await this.repository.find({ relations: ['produtos', 'promocoes', 'pedidos'] });
  }

  async findById(id: number, relations = ['produtos', 'promocoes', 'pedidos']): Promise<Pharmacy | null> {
    return await this.repository.findOne({ where: { id }, relations });
  }

  async findByQuery(query: FindOptionsWhere<Pharmacy> & { skip: number; take: number; order: any; } | FindOptionsWhere<Pharmacy>[] & { skip: number; take: number; order: any; }, relations = ['produtos', 'promocoes', 'pedidos']): Promise<Pharmacy[]> {
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
    return await this.repository.find({ where: { ...query }, relations });
  }

  async findByQueryOne(query: FindOptionsWhere<Pharmacy> | FindOptionsWhere<Pharmacy>[], relations = ['produtos', 'promocoes', 'pedidos']): Promise<Pharmacy | null> {
    return await this.repository.findOne({ where: { ...query }, relations });
  }

  async update(id: number, data: Partial<IPharmacy>): Promise<Pharmacy | null> {
    const pharmacy = await this.repository.findOneBy({ id });
    if (!pharmacy) return null;
    Object.assign(pharmacy, data);
    return await this.repository.save(pharmacy);
  }

  async delete(id: number): Promise<null> {
    const pharmacy = await this.repository.findOneBy({ id });
    if (!pharmacy) return null;
    await this.repository.remove(pharmacy);
    return null;
  }
}
