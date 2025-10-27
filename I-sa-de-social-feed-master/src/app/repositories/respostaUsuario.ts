import { Repository, FindOptionsWhere } from 'typeorm';
import { RespostaUsuario } from '../entities/RespostaUsuario';
import { IRespostaUsuario } from '../interfaces/respostaUsuario';
import { IRespostaUsuarioRepository } from '../interfaces/Repositories/respostaUsuarioRepository';
import dataSource from '../../database/typeorm';

export class RespostaUsuarioRepository implements IRespostaUsuarioRepository {
  private repository: Repository<RespostaUsuario>;

  constructor() {
    this.repository = dataSource.getRepository(RespostaUsuario);
  }

  async save(data: IRespostaUsuario & { questao: { id_questao: number } }): Promise<RespostaUsuario> {
    const resposta = this.repository.create(data);
    return await this.repository.save(resposta);
  }

  async update(id: number, data: Partial<IRespostaUsuario>): Promise<RespostaUsuario | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<RespostaUsuario | null> {
    return await this.repository.findOne({
      where: { id_resposta: id },
      relations: ['questao'],
    });
  }

  async findByQuery(query: any): Promise<RespostaUsuario[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['questao'], ...objectFilter });
    }
    return await this.repository.find({
      where: query,
      relations: ['questao'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IRespostaUsuario> | FindOptionsWhere<IRespostaUsuario>[]): Promise<RespostaUsuario | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['questao'],
    });
  }

  async findAll(): Promise<RespostaUsuario[]> {
    return await this.repository.find({ relations: ['questao'], });
  }

  async delete(id: number): Promise<null> {
    const resposta = await this.findById(id);
    if (!resposta) return null;
    await this.repository.remove(resposta);
    return null;
  }
}
