
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';
import dataSource from '../../database/typeorm';
import { UnidadeSaude } from '../entities';
import { IUnidadeSaude } from '../interfaces/unidadeSaude';
import { IUnidadeSaudeRepository } from '../interfaces/Repositories/unidadeSaudeRepository';

export class UnidadeSaudeRepository implements IUnidadeSaudeRepository {
  private repository: Repository<UnidadeSaude> = dataSource.getRepository(UnidadeSaude);

  async save(data: IUnidadeSaude & { endereco: { id: number } }) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(order: any = {
    created_at: 'DESC'
  }): Promise<UnidadeSaude[]> {
    return await this.repository.find({
      relations: ['endereco'], order
    });
  }

  async findByCNPJ(cnpj: string): Promise<UnidadeSaude | null> {
    return await this.repository.findOne({ where: { cnpj }, relations: ['endereco'] });
  }

  async findByQuery({ query: queries, order = {
    created_at: 'DESC'
  },
    limit = null,
   lastFarmaciaCNPJ= null
  }: any): Promise<UnidadeSaude[]> {
    if (lastFarmaciaCNPJ) {
      const query = this.repository.createQueryBuilder('unidadeSaude');

      query.where(queries)

      query.andWhere('unidadeSaude.cnpj < :lastFarmaciaCNPJ', { lastFarmaciaCNPJ });

      query
        .leftJoinAndSelect('unidadeSaude.endereco', 'endereco')

      if (order) {
        Object.entries(order).forEach(([key, value]: any) => {
          query.orderBy(`unidadeSaude.${key}`, value || 'DESC');
        });
      }
      if (limit) {
        query.take(limit);
      }

      return await query.getMany();
    }
    return await this.repository.find({
      where: queries, relations: ['endereco'], order, take: limit
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IUnidadeSaude> | FindOptionsWhere<IUnidadeSaude>[]): Promise<UnidadeSaude | null> {
    return await this.repository.findOne({ where: query, relations: ['endereco'] });
  }

  async update(cnpj: string, data: Partial<IUnidadeSaude>): Promise<UnidadeSaude | null> {
    const comentario = await this.repository.findOneBy({ cnpj });
    if (!comentario) return null;
    Object.assign(comentario, data);
    return await this.repository.save(comentario);
  }

  async delete(cnpj: string): Promise<null> {
    const comentario = await this.repository.findOneBy({ cnpj });
    if (!comentario) return null;
    await this.repository.remove(comentario);
    return null;
  }
}
