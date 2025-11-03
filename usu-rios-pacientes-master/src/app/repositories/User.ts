// Exemplo: ComentarioRepository.ts
import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { User } from '../entities/Users';
import { IUser } from '../interfaces/user';
import { IUserRepository } from '../interfaces/Repositories/userRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User> = dataSource.getRepository(User);

  async save(data: IUser) {
    const comentario = this.repository.create(data);
    return await this.repository.save(comentario);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find({ relations: ['contatos', 'contactEntries', 'contatos_de_outros'] });
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({ where: { id }, relations: ['contatos', 'contactEntries', 'contatos_de_outros'] });
  }

  async findByQuery(query: FindOptionsWhere<IUser> & { skip: number; take: number; order: any; } | FindOptionsWhere<IUser>[] & { skip: number; take: number; order: any; }): Promise<User[]> {
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

    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({ where: { ...query }, relations: ['contatos', 'contactEntries', 'contatos_de_outros'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['contatos', 'contactEntries', 'contatos_de_outros'] });
  }

  async findByQueryOne(
    query: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[],
    isGetPassword: boolean = false
  ): Promise<User | null> {
    if (!isGetPassword) {
      return await this.repository.findOne({ where: { ...query }, relations: ['contatos', 'contactEntries', 'contatos_de_outros'] });
    }

    // --- CORREÇÃO AQUI ---
    // Alteramos a primeira junção de "user.contatos" (que são telefones)
    // para "user.contactEntries" (que é a lista de usuários de contato correta).
    const qb = this.repository.createQueryBuilder("user")
      .leftJoinAndSelect("user.contactEntries", "usuariosContatos") // <-- CORRIGIDO
      .leftJoinAndSelect("usuariosContatos.contato", "contato")
      .leftJoinAndSelect("user.contatos_de_outros", "usuariosContatosDe") 
      .leftJoinAndSelect("usuariosContatosDe.usuario", "usuarioDe") 
      .addSelect("user.senha_hash");
    // --- FIM DA CORREÇÃO ---

    if (Array.isArray(query)) {
      qb.where(query.map((q, i) => {
        const keys = Object.keys(q);
        return keys.map(key => `user.${key} = :${key}_${i}`).join(' AND ');
      }).join(' OR '));

      // Adiciona os parâmetros
      query.forEach((q, i) => {
        Object.entries(q).forEach(([key, value]) => {
          qb.setParameter(`${key}_${i}`, value);
        });
      });
    } else {
      const keys = Object.keys(query);
      qb.where(
        keys.map(key => `user.${key} = :${key}`).join(' AND ')
      );

      keys.forEach(key => {
        qb.setParameter(key, (query as any)[key]);
      });
    }

    return await qb.getOne();
  }
  async update(id: number, data: Partial<IUser>): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    Object.assign(user, data);
    return await this.repository.save(user);
  }

  async delete(id: number): Promise<null> {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    await this.repository.remove(user);
    return null;
  }
}
