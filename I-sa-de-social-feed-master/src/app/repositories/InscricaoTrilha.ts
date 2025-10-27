import { FindOptionsWhere, Repository } from 'typeorm';
import { InscricaoTrilha } from '../entities/InscricaoTrilha';
import { IInscricaoTrilha } from '../interfaces/inscricaoTrilha';
import { IInscricaoTrilhaRepository } from '../interfaces/Repositories/inscricaoTrilhaRepository';
import dataSource from '../../database/typeorm';

export class InscricaoTrilhaRepository implements IInscricaoTrilhaRepository {
  private repository: Repository<InscricaoTrilha>;

  constructor() {
    this.repository = dataSource.getRepository(InscricaoTrilha);
  }

  async save(data: IInscricaoTrilha & { trilha: { id_trilha: number } }): Promise<InscricaoTrilha> {
    const inscricao: any = this.repository.create(data);
    return await this.repository.save(inscricao);
  }

  async update(id: number, data: Partial<IInscricaoTrilha>): Promise<InscricaoTrilha | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<InscricaoTrilha | null> {
    return await this.repository.findOne({
      where: { id_inscricao: id },
      relations: ['trilha', 'progressos', 'certificado'],
    });
  }

  async findByQuery(query: any): Promise<InscricaoTrilha[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['trilha', 'progressos', 'certificado'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['trilha', 'progressos', 'certificado'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IInscricaoTrilha> | FindOptionsWhere<IInscricaoTrilha>[]): Promise<InscricaoTrilha | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['trilha', 'progressos', 'certificado'],
    });
  }

  async findAll(): Promise<InscricaoTrilha[]> {
    return await this.repository.find({
      relations: ['trilha', 'progressos', 'certificado'],
    });
  }

  async delete(id: number): Promise<null> {
    const inscricao = await this.findById(id);
    if (!inscricao) return null;
    await this.repository.remove(inscricao);
    return null;
  }
}
