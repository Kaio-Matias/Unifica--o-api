
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Seguidor } from '../entities';
import { ISeguidor } from '../interfaces/seguidor';
import { ISeguidorRepository } from '../interfaces/Repositories/seguidorRepository';

export class SeguidorRepository implements ISeguidorRepository {
  private repository: Repository<Seguidor> = dataSource.getRepository(Seguidor);

  async save(data: ISeguidor) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(order: any = {
    created_at: 'DESC'
  }): Promise<Seguidor[]> {
    return await this.repository.find({ order });
  }
  async findById(id: number): Promise<Seguidor | null> {
    return await this.repository.findOneBy({ id_seguidor: id });
  }

  async findByQuery({ query: queries, order = {
    created_at: 'DESC'
  },
    limit = null,
    lastSalvamentoId = null
  }: any
  ): Promise<Seguidor[]> {
    if (lastSalvamentoId) {
      const query = this.repository.createQueryBuilder('seguidor');

      query.where(queries)

      query.andWhere('seguidor.id < :lastSalvamentoId', { lastSalvamentoId });

      if (order) {
        Object.entries(order).forEach(([key, value]: any) => {
          query.orderBy(`seguidor.${key}`, value || 'DESC');
        });
      }
      if (limit) {
        query.take(limit);
      }

      return await query.getMany();
    }
    return await this.repository.find({ where: queries, order, take: limit });
  }

  async findByQueryOne(query: FindOptionsWhere<ISeguidor> | FindOptionsWhere<ISeguidor>[]): Promise<Seguidor | null> {
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<ISeguidor>): Promise<Seguidor | null> {
    const comentario = await this.repository.findOneBy({ id_seguidor: id });
    if (!comentario) return null;
    Object.assign(comentario, data);
    return await this.repository.save(comentario);
  }

  async delete(id: number): Promise<null> {
    const comentario = await this.repository.findOneBy({ id_seguidor: id });
    if (!comentario) return null;
    await this.repository.remove(comentario);
    return null;
  }
}
