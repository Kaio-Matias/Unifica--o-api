
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Salvamento } from '../entities';
import { ISalvamento } from '../interfaces/salvamento';
import { ISalvamentoRepository } from '../interfaces/Repositories/salvamentoRepository';

export class SalvamentoRepository implements ISalvamentoRepository {
  private repository: Repository<Salvamento> = dataSource.getRepository(Salvamento);

  async save(data: ISalvamento & { postagem: { id: number } }) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll({ order = {
    created_at: 'DESC'
  },
    limit = null,
    lastSalvamentoId = null
  }: any): Promise<Salvamento[]> {
    if (lastSalvamentoId) {
      const query = this.repository.createQueryBuilder('salvamentos');

      query.andWhere('salvamentos.id_salvamento < :lastSalvamentoId', { lastSalvamentoId });

      query
        .leftJoinAndSelect('salvamentos.postagem', 'postagem')
      if (order) {
        Object.entries(order).forEach(([key, value]: any) => {
          query.orderBy(`pharmacy.${key}`, value || 'DESC');
        });
      }
      if (limit) {
        query.take(limit);
      }

      return await query.getMany();
    }
    return await this.repository.find({ relations: ['postagem'], order });
  }

  async findById(id: number): Promise<Salvamento | null> {
    return await this.repository.findOneBy({ id_salvamento: id });
  }

  async findByQuery({ query: queries, order = {
    created_at: 'DESC'
  },
    limit = null,
    lastSalvamentoId = null
  }: any): Promise<Salvamento[]> {
    if (lastSalvamentoId) {
      const query = this.repository.createQueryBuilder('salvamentos');

      query.where(queries)

      query.andWhere('salvamentos.id_salvamento < :lastSalvamentoId', { lastSalvamentoId });

      query
        .leftJoinAndSelect('salvamentos.postagem', 'postagem')

      if (order) {
        Object.entries(order).forEach(([key, value]: any) => {
          query.orderBy(`salvamentos.${key}`, value || 'DESC');
        });
      }
      if (limit) {
        query.take(limit);
      }

      return await query.getMany();
    }
    return await this.repository.find({ where: queries, relations: ['postagem'], order, take: limit });
  }

  async findByQueryOne(query: FindOptionsWhere<ISalvamento> | FindOptionsWhere<ISalvamento>[]): Promise<Salvamento | null> {
    return await this.repository.findOne({ where: query, relations: ['postagem'], });
  }

  async update(id: number, data: Partial<ISalvamento>): Promise<Salvamento | null> {
    const comentario = await this.repository.findOneBy({ id_salvamento: id });
    if (!comentario) return null;
    Object.assign(comentario, data);
    return await this.repository.save(comentario);
  }

  async delete(id: number): Promise<null> {
    const comentario = await this.repository.findOneBy({ id_salvamento: id });
    if (!comentario) return null;
    await this.repository.remove(comentario);
    return null;
  }
}
