
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Notificacao } from '../entities';
import { INotificacao } from '../interfaces/notificacao';
import { INotificacaoRepository } from '../interfaces/Repositories/notificacaoRepository';

export class NotificacaoRepository implements INotificacaoRepository {
  private repository: Repository<Notificacao> = dataSource.getRepository(Notificacao);

  async save(data: INotificacao) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll({
    order = {
      created_at: 'DESC'
    },
    limit = 10,
    lastNotificationId = null
  }: any): Promise<INotificacao[]> {
    if (lastNotificationId) {
      const query = this.repository.createQueryBuilder('notificacao');

      query.andWhere('postagem.id < :lastNotificationId', { lastNotificationId });

      Object.entries(order).forEach(([key, value]: any) => {
        query.orderBy(`notificacao.${key}`, value || 'DESC');
      });

      query
        .take(limit);

      return await query.getMany();
    }
    return await this.repository.find({
      order, take: limit
    });
  }

  async findById(id: number): Promise<Notificacao | null> {
    return await this.repository.findOne({
      where: { id_notificacao: id }
    });
  }

  async findByQuery({ query, order = {
    created_at: 'DESC'
  },
    limit = 10,
    lastNotificationId = null }: any): Promise<Notificacao[]> {

    if (lastNotificationId) {
      const qb = this.repository.createQueryBuilder('notificacao');

      qb.where(query)

      if (lastNotificationId) {
        qb.andWhere('notificacao.id_notificacao < :lastNotificationId', { lastNotificationId });
      }

      Object.entries(order).forEach(([key, value]: any) => {
        qb.orderBy(`notificacao.${key}`, value || 'DESC');
      });

      qb.take(limit);

      return await qb.getMany();
    }

    return await this.repository.find({
      where: query, order, take: limit,
    });
  }


  async findByQueryOne(query: FindOptionsWhere<INotificacao> | FindOptionsWhere<INotificacao>[]): Promise<Notificacao | null> {
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<INotificacao>): Promise<Notificacao | null> {
    const comentario = await this.repository.findOneBy({ id_notificacao: id });
    if (!comentario) return null;
    Object.assign(comentario, data);
    return await this.repository.save(comentario);
  }

  async delete(id: number): Promise<null> {
    const comentario = await this.repository.findOneBy({ id_notificacao: id });
    if (!comentario) return null;
    await this.repository.remove(comentario);
    return null;
  }
}
