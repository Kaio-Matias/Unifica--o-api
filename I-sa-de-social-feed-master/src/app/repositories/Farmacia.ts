
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Farmacia } from '../entities';
import { IFarmacia } from '../interfaces/farmacia';
import { IFarmaciaRepository } from '../interfaces/Repositories/farmaciaRepository';

export class FarmaciaRepository implements IFarmaciaRepository {
  private repository: Repository<Farmacia> = dataSource.getRepository(Farmacia);

  async save(data: IFarmacia & { endereco: { id: number } }) {
    const pharmacy = this.repository.create(data);
    return await this.repository.save(pharmacy);
  }

  async findAll({
    order = {
      created_at: 'DESC'
    },
    limit = null,
    lastFarmaciaId = null
  }: any
  ): Promise<Farmacia[]> {
    if (lastFarmaciaId) {
      const query = this.repository.createQueryBuilder('pharmacy');

      query.andWhere('pharmacy.id < :lastFarmaciaId', { lastFarmaciaId });

      query
        .leftJoinAndSelect('pharmacy.endereco', 'endereco')
        .leftJoinAndSelect('pharmacy.enderecos', 'enderecos')

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
    return await this.repository.find({ relations: ['endereco', 'enderecos'] });
  }

  async findByCNPJ(cnpj: string): Promise<Farmacia | null> {
    return await this.repository.findOne({ where: { cnpj }, relations: ['endereco', 'enderecos'] });
  }

  async findByQuery({ query: queries, order = {
    created_at: 'DESC'
  },
    limit = null,
    lastFarmaciaCNPJ = null }: any): Promise<Farmacia[]> {
    if (lastFarmaciaCNPJ) {
      const query = this.repository.createQueryBuilder('pharmacy');

      query.where(queries)

      query.andWhere('pharmacy.cnpj < :lastFarmaciaCNPJ', { lastFarmaciaCNPJ });

      query
        .leftJoinAndSelect('pharmacy.endereco', 'endereco')
        .leftJoinAndSelect('pharmacy.enderecos', 'enderecos')

      Object.entries(order).forEach(([key, value]: any) => {
        query.orderBy(`pharmacy.${key}`, value || 'DESC');
      });

      if (limit) {
        query.take(limit);
      }

      return await query.getMany();
    }
    return await this.repository.find({ where: queries, relations: ['endereco', 'enderecos'], take: limit, order });
  }

  async findByQueryOne(query: FindOptionsWhere<IFarmacia> | FindOptionsWhere<IFarmacia>[]): Promise<Farmacia | null> {
    return await this.repository.findOne({ where: query, relations: ['endereco', 'enderecos'] });
  }

  async update(cnpj: string, data: Partial<IFarmacia>): Promise<Farmacia | null> {
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
