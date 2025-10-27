import { FindOptionsWhere, Repository } from 'typeorm';
import { Certificado } from '../entities/Certificado';
import { ICertificado } from '../interfaces/certificado';
import { ICertificadoRepository } from '../interfaces/Repositories/certificadoRepository';
import dataSource from '../../database/typeorm';

export class CertificadoRepository implements ICertificadoRepository {
  private repository: Repository<Certificado>;

  constructor() {
    this.repository = dataSource.getRepository(Certificado);
  }

  async save(data: ICertificado & { inscricao: { id_inscricao: number } }): Promise<Certificado> {
    const certificado = this.repository.create(data);
    return await this.repository.save(certificado);
  }

  async update(id: number, data: Partial<ICertificado>): Promise<Certificado | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<Certificado | null> {
    return await this.repository.findOne({ where: { id_certificado: id }, relations: ['inscricao'] });
  }

  async findByQuery(query: any): Promise<Certificado[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['inscricao',], ...objectFilter });
    }
    return await this.repository.find({ where: query, relations: ['inscricao'] });
  }

  async findByQueryOne(query: FindOptionsWhere<ICertificado> | FindOptionsWhere<ICertificado>[]): Promise<Certificado | null> {
    return await this.repository.findOne({ where: query, relations: ['inscricao'] });
  }

  async findAll(): Promise<Certificado[]> {
    return await this.repository.find({ relations: ['inscricao'] });
  }

  async delete(id: number): Promise<null> {
    const certificado = await this.findById(id);
    if (!certificado) return null;
    await this.repository.remove(certificado);
    return null;
  }
}
