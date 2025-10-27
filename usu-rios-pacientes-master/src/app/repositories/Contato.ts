// Exemplo: ComentarioRepository.ts
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Contato } from '../entities/Contatos';
import { IContato } from '../interfaces/contato';
import { IContatoRepository } from '../interfaces/Repositories/contatoRepository';
import { IUser } from '../interfaces/user';

export class ContactRepository implements IContatoRepository {
  private repository: Repository<Contato> = dataSource.getRepository(Contato);

  async save(data: IContato, user: IUser): Promise<IContato> {

    const contact = this.repository.create({
      tipo_contato: data.tipo_contato,
      valor: data.valor,
      is_principal: data.is_principal,
      usuario: user
    });

    const saved = await this.repository.save(contact);

    return {
      id: saved.id,
      tipo_contato: saved.tipo_contato,
      valor: saved.valor,
      is_principal: saved.is_principal,
      id_usuario: saved.id_usuario  // O campo que você usa no DTO/interface
    };
  }

  async findAll(): Promise<Contato[]> {
    return await this.repository.find({ relations: ['usuario'] });
  }

  async findById(id: number): Promise<Contato | null> {
    return await this.repository.findOne({ where: { id }, relations: ['usuario'] });
  }

  async findByQuery(query: FindOptionsWhere<IContato> & { skip: number; take: number; order: any; } | FindOptionsWhere<IContato>[] & { skip: number; take: number; order: any; }): Promise<Contato[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['usuario'], ...objectFilter });
    }

    return await this.repository.find({ where: { ...query }, relations: ['usuario'] });
  }

  async findByQueryOne(query: FindOptionsWhere<IContato> | FindOptionsWhere<IContato>[]): Promise<Contato | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['usuario'] });
  }

  async update(id: number, data: Partial<IContato>): Promise<IContato | null> {
    const contact = await this.repository.findOneBy({ id });
    if (!contact) return null;
    Object.assign(contact, data);
    return await this.repository.save(contact);
  }

  async delete(id: number): Promise<null> {
    const contact = await this.repository.findOneBy({ id });
    if (!contact) return null;
    await this.repository.remove(contact);
    return null;
  }
}
