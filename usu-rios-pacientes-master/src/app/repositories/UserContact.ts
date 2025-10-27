// Exemplo: ComentarioRepository.ts
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { UsuariosContatos } from '../entities/UsuariosContatos';
import { IUsuariosContatos } from '../interfaces/usuariosContato';
import { IUsuariosContatosRepository } from '../interfaces/Repositories/userContactRepository';
import { Contato } from '@models/Contatos';
import { User } from '@models/Users';

export class UserContactRepository implements IUsuariosContatosRepository {
  public repository: Repository<UsuariosContatos> = dataSource.getRepository(UsuariosContatos);

  async save(data: { usuario: User, contato: Contato }) {
    const contactUser = this.repository.create(data);
    return await this.repository.save(contactUser);
  }

  async findAll(): Promise<UsuariosContatos[]> {
    return await this.repository.find({
      relations: ['usuario', 'contato'],
    });
  }

  async findById(id: number): Promise<UsuariosContatos | null> {
    return await this.repository.findOne({ where: { id }, relations: ['usuario', 'contato'], });
  }

  async findByQuery(query: FindOptionsWhere<IUsuariosContatos> & { skip: number; take: number; order: any; } | FindOptionsWhere<IUsuariosContatos & { skip: number; take: number; order: any; }>[] & { skip: number; take: number; order: any; }): Promise<UsuariosContatos[]> {

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
      return await this.repository.find({ where: { ...query }, relations: ['usuario', 'contato'], ...objectFilter });
    }

    return await this.repository.find({ where: { ...query }, relations: ['usuario', 'contato'], });
  }

  async findByQueryOne(query: FindOptionsWhere<IUsuariosContatos> | FindOptionsWhere<IUsuariosContatos>[] | any): Promise<UsuariosContatos | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['usuario', 'contato'], });
  }

  async findByQueryOneWIithContactAndUser(query: FindOptionsWhere<IUsuariosContatos> | FindOptionsWhere<IUsuariosContatos>[] | any): Promise<UsuariosContatos | null> {
    return await this.repository
      .createQueryBuilder('uc')
      .innerJoin('uc.usuario', 'usuario')
      .innerJoin('uc.contato', 'contato')
      .where('usuario.id = :usuarioId', { usuarioId: query?.usuario?.id })
      .andWhere('contato.id = :contatoId', { contatoId: query?.id })
      .getOne();
  }

  async update(id: number, data: Partial<IUsuariosContatos>): Promise<UsuariosContatos | null> {
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
