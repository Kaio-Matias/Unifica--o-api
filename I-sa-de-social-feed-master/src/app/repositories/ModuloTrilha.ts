import { FindOptionsWhere, Repository } from 'typeorm';
import { ModuloTrilha } from '../entities/ModulosTrilhas';
import { IModuloTrilha } from '../interfaces/moduloTrilha';
import { IModuloTrilhaRepository } from '../interfaces/Repositories/moduloTrilhaRepository';
import dataSource from '../../database/typeorm';

export class ModuloTrilhaRepository implements IModuloTrilhaRepository {
  private repository: Repository<ModuloTrilha>;

  constructor() {
    this.repository = dataSource.getRepository(ModuloTrilha);
  }

  async save(data: IModuloTrilha & { trilha: { id_trilha: number } }): Promise<ModuloTrilha> {
    const modulo = this.repository.create(data);
    return await this.repository.save(modulo);
  }

  async update(id: number, data: Partial<IModuloTrilha>): Promise<ModuloTrilha | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<ModuloTrilha | null> {
    return await this.repository.findOne({
      where: { id_modulo: id },
      relations: ['trilha', 'aulas'],
    });
  }

  async findByQuery(query: any): Promise<ModuloTrilha[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['trilha', 'aulas'], ...objectFilter });
    }

    return await this.repository.find({
      where: query,
      relations: ['trilha', 'aulas'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IModuloTrilha> | FindOptionsWhere<IModuloTrilha>[]): Promise<ModuloTrilha | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['trilha', 'aulas'],
    });
  }

  async findAll(): Promise<ModuloTrilha[]> {
    return await this.repository.find({ relations: ['trilha', 'aulas'] });
  }

  async delete(id: number): Promise<null> {
    const modulo = await this.findById(id);
    if (!modulo) return null;
    await this.repository.remove(modulo);
    return null;
  }
}
