
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Postagem } from '../entities';
import { IPostagem } from '../interfaces/postagem';
import { IPostagemRepository } from '../interfaces/Repositories/postagemRepository';

export class PostagemRepository implements IPostagemRepository {
  private repository: Repository<Postagem> = dataSource.getRepository(Postagem);

  async save(data: IPostagem & { localizacao: { id_localizacao: number } }): Promise<any> {
    if (Array.isArray(data)) {
      throw new Error('save só aceita um único objeto IPostagem');
    }
    const postagem = this.repository.create(data as any);
    return await this.repository.save(postagem);
  }

  async findAll({
    order = {
      created_at: 'DESC'
    },
    limit = 10,
    lastPostId = null
  }: any
  ): Promise<Postagem[]> {
    if (lastPostId) {
      const query = this.repository.createQueryBuilder('postagem');

      query.andWhere('postagem.id < :lastPostId', { lastPostId });

      query
        .leftJoinAndSelect('postagem.categorias', 'categorias')
        .leftJoinAndSelect('postagem.localizacao', 'localizacao')
        .leftJoinAndSelect('postagem.comentarios', 'comentarios')
        .leftJoinAndSelect('postagem.curtidas_list', 'curtidas_list')

      Object.entries(order).forEach(([key, value]: any) => {
        query.orderBy(`postagem.${key}`, value || 'DESC');
      });

      query.take(limit);

      return await query.getMany();
    }

    return await this.repository.find({
      relations: ['categorias', 'localizacao', 'comentarios', 'curtidas_list'], order, take: limit
    })
  }

  async findById(id: number): Promise<Postagem | null> {
    return await this.repository.findOne({ where: { id }, relations: ['categorias', 'localizacao', 'comentarios', 'curtidas_list'] });
  }

  async findByQuery({ query: queries, order = {
    created_at: 'DESC'
  },
    limit = 10,
    lastPostId = null }: any): Promise<Postagem[]> {
    if (lastPostId) {
      const query = this.repository.createQueryBuilder('postagem');

      query.where(queries)

      query.andWhere('postagem.id < :lastPostId', { lastPostId });

      query
        .leftJoinAndSelect('postagem.categorias', 'categorias')
        .leftJoinAndSelect('postagem.localizacao', 'localizacao')
        .leftJoinAndSelect('postagem.comentarios', 'comentarios')
        .leftJoinAndSelect('postagem.curtidas_list', 'curtidas_list')

      Object.entries(order).forEach(([key, value]: any) => {
        query.orderBy(`postagem.${key}`, value || 'DESC');
      });

      query.take(limit);

      return await query.getMany();
    }

    return await this.repository.find({
      where: queries, relations: ['categorias', 'localizacao', 'comentarios', 'curtidas_list'], order, take: limit
    });
  }


  async findByQueryOne(query: FindOptionsWhere<Postagem> | FindOptionsWhere<Postagem>[]): Promise<Postagem | null> {
    return await this.repository.findOne({ where: query, relations: ['categorias', 'localizacao', 'comentarios', 'curtidas_list'] });
  }

  async update(id: number, data: Partial<IPostagem>): Promise<Postagem | null> {
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
