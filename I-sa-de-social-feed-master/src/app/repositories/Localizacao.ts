
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Localizacao } from '../entities';
import { ILocalizacao } from '../interfaces/localizacao';
import { ILocalizacaoRepository } from '../interfaces/Repositories/localizacaoRepository';

export class LocalizacaoRepository implements ILocalizacaoRepository {
  private repository: Repository<Localizacao> = dataSource.getRepository(Localizacao);

  async save(data: ILocalizacao) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<Localizacao[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Localizacao | null> {
    return await this.repository.findOneBy({ id_localizacao: id });
  }

  async findByQuery(query: any): Promise<Localizacao[]> {
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
      return await this.repository.find({ where: { ...query }, ...objectFilter });
    }
    return await this.repository.findBy(query);
  }

  async findByQueryOne(query: FindOptionsWhere<ILocalizacao> | FindOptionsWhere<ILocalizacao>[]): Promise<Localizacao | null> {
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<ILocalizacao>): Promise<Localizacao | null> {
    const comentario = await this.repository.findOneBy({ id_localizacao: id });
    if (!comentario) return null;
    Object.assign(comentario, data);
    return await this.repository.save(comentario);
  }

  async delete(id: number): Promise<null> {
    const comentario = await this.repository.findOneBy({ id_localizacao: id });
    if (!comentario) return null;
    await this.repository.remove(comentario);
    return null;
  }
}
