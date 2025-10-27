import { FindOptionsWhere, Repository } from 'typeorm';
import { CategoriaPostagem } from '../entities/CategoriaPostagem';
import { ICategoriaPostagem } from '../interfaces/categoriaPostagem';
import { ICategoriaPostagemRepository } from '../interfaces/Repositories/categoriaPostagemRepository';
import dataSource from '../../database/typeorm';

export class CategoriaPostagemRepository implements ICategoriaPostagemRepository {
  private repository: Repository<CategoriaPostagem>;

  constructor() {
    this.repository = dataSource.getRepository(CategoriaPostagem);
  }

  async save(data: ICategoriaPostagem): Promise<CategoriaPostagem> {
    const categoria = this.repository.create(data);
    return await this.repository.save(categoria);
  }

  async update(id: number, data: Partial<ICategoriaPostagem>): Promise<CategoriaPostagem | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<CategoriaPostagem | null> {
    return await this.repository.findOne({ where: { id_categoria: id }, relations: ['postagens',], });
  }

  async findByQuery(query: any): Promise<CategoriaPostagem[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['postagens',], ...objectFilter });
    }
    return await this.repository.find({ where: query, relations: ['postagens',], });
  }

  async findByQueryOne(query: FindOptionsWhere<ICategoriaPostagem> | FindOptionsWhere<ICategoriaPostagem>[]): Promise<CategoriaPostagem | null> {
    return await this.repository.findOne({ where: query, relations: ['postagens',], });
  }

  async findAll(): Promise<CategoriaPostagem[]> {
    return await this.repository.find({ relations: ['postagens',], });
  }

  async delete(id: number): Promise<null> {
    const categoria = await this.findById(id);
    if (!categoria) return null;
    await this.repository.remove(categoria);
    return null;
  }
}
