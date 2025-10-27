
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { ProfissionalDetalhes } from '../entities';
import { IProfissionalDetalhes } from '../interfaces/profissionalDetalhes';
import { IProfissionalDetalhesRepository } from '../interfaces/Repositories/profissionalDetalhesRepository';

export class ProfissionalDetalhesRepository implements IProfissionalDetalhesRepository {
  private repository: Repository<ProfissionalDetalhes> = dataSource.getRepository(ProfissionalDetalhes);

  async save(data: IProfissionalDetalhes) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<ProfissionalDetalhes[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<ProfissionalDetalhes | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByQuery(query: any): Promise<ProfissionalDetalhes[]> {
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

  async findByQueryOne(query: FindOptionsWhere<IProfissionalDetalhes> | FindOptionsWhere<IProfissionalDetalhes>[]): Promise<ProfissionalDetalhes | null> {
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<IProfissionalDetalhes>): Promise<ProfissionalDetalhes | null> {
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
