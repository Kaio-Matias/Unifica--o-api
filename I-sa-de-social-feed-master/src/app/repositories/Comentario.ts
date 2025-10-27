
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Comentario } from '../entities';
import { IComentario } from '../interfaces/comentario';
import { IComentarioRepository } from '../interfaces/Repositories/comentarioRepository';

export class ComentarioRepository implements IComentarioRepository {
  private repository: Repository<Comentario> = dataSource.getRepository(Comentario);

  async save(data: IComentario & { postagem: { id: number } }) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<Comentario[]> {
    return await this.repository.find({ relations: ['postagem', 'respostas'] });
  }

  async findById(id: number): Promise<Comentario | null> {
    return await this.repository.findOne({ where: { id }, relations: ['postagem', 'respostas'] });
  }

  async findByQuery(query: any): Promise<Comentario[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['postagem', 'respostas'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['postagem', 'respostas'] });
  }

  async findByQueryOne(query: FindOptionsWhere<Comentario> | FindOptionsWhere<Comentario>[]): Promise<Comentario | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['postagem', 'respostas'] });
  }

  async update(id: number, data: Partial<IComentario>): Promise<Comentario | null> {
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
