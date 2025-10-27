
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Conversa } from '../entities';
import { IConversa } from '../interfaces/conversa';
import { IConversaRepository } from '../interfaces/Repositories/conversaRepository';

export class ConversaRepository implements IConversaRepository {
  private repository: Repository<Conversa> = dataSource.getRepository(Conversa);

  async save(data: IConversa) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<Conversa[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Conversa | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByQuery(query: any): Promise<Conversa[]> {
    if (query.where) {
      const result = await this.repository.find({ where: query.where, order: query.order });
      delete query.where;
      delete query.order;
      return result;
    }
    return await this.repository.findBy(query);
  }

  async findByQueryOne(query: FindOptionsWhere<IConversa> | FindOptionsWhere<IConversa>[]): Promise<Conversa | null> {
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<IConversa>): Promise<Conversa | null> {
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
