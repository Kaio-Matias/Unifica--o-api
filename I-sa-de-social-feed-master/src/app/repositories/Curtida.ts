
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Curtida } from '../entities';
import { ICurtida } from '../interfaces/curtida';
import { ICurtidaRepository } from '../interfaces/Repositories/curtidaRepository';

export class CurtidaRepository implements ICurtidaRepository {
  private repository: Repository<Curtida> = dataSource.getRepository(Curtida);

  async save(data: ICurtida & { postagem: { id: number } }) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<Curtida[]> {
    return await this.repository.find({ relations: ['postagem'] });
  }

  async findById(id: number): Promise<Curtida | null> {
    return await this.repository.findOne({ where: { id }, relations: ['postagem'] });
  }

  async findByQuery(query: any): Promise<Curtida[]> {
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

    if (objectFilter.skip || objectFilter.take || objectFilter.order || Object.keys(query).length > 0) {
      return await this.repository.find({ where: { ...query }, relations: ['postagem'], ...objectFilter });
    }
    return await this.repository.find({ where: query, relations: ['postagem'] });
  }

  async findByQueryOne(query: FindOptionsWhere<ICurtida> | FindOptionsWhere<ICurtida>[]): Promise<Curtida | null> {
    return await this.repository.findOne({ where: query, relations: ['postagem'] });
  }

  async update(id: number, data: Partial<ICurtida>): Promise<Curtida | null> {
    const comentario = await this.repository.findOneBy({ id });
    if (!comentario) return null;
    Object.assign(comentario, data);
    return await this.repository.save(comentario);
  }

  async delete(id: number): Promise<null> {
    const comentario = await this.repository.findOneBy({ id });
    if (!comentario) return null;
    await this.repository.remove(comentario);
    return null;
  }
}
