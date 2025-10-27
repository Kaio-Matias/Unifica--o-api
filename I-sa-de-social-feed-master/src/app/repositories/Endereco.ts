// Exemplo: ComentarioRepository.ts
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Endereco } from '../entities';
import { IEndereco } from '../interfaces/endereco';
import { IEnderecoRepository } from '../interfaces/Repositories/enderecoRepository';

export class EnderecoRepository implements IEnderecoRepository {
  private repository: Repository<Endereco> = dataSource.getRepository(Endereco);

  async save(data: IEndereco & { unidadeSaude?: { cnpj: string }, farmacia?: { cnpj: string } }) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<Endereco[]> {
    return await this.repository.find({ relations: ['farmacia', 'unidadeSaude'] });
  }

  async findById(id: number): Promise<Endereco | null> {
    return await this.repository.findOne({ where: { id }, relations: ['farmacia', 'unidadeSaude'] });
  }

  async findByQuery(query: any): Promise<Endereco[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['farmacia', 'unidadeSaude'], ...objectFilter });
    }
    return await this.repository.find({ where: query, relations: ['farmacia', 'unidadeSaude'] });
  }

  async findByQueryOne(query: FindOptionsWhere<IEndereco> | FindOptionsWhere<IEndereco>[]): Promise<Endereco | null> {
    return await this.repository.findOne({ where: query, relations: ['farmacia', 'unidadeSaude'] });
  }

  async update(id: number, data: Partial<IEndereco>): Promise<Endereco | null> {
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
