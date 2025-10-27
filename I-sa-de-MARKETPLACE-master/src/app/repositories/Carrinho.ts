import { FindOptionsWhere, Repository } from 'typeorm';
import { Carrinho, CarrinhoItem } from '../entities';
import dataSource from '../../database/typeorm';
import { ICarrinho, ICarrinhoItem } from '../interfaces/carrinho';
import { ICarrinhoRepository, ICarrinhoItemRepository } from '../interfaces/repositories/carrinhoRepository';

export class CarrinhoRepository implements ICarrinhoRepository {
  private repository: Repository<Carrinho>;

  constructor() {
    this.repository = dataSource.getRepository(Carrinho);
  }

  async save(data: ICarrinho) {
    const carrinho = await this.repository.create(data);
    return await this.repository.save(carrinho);
  }

  async findAll(): Promise<Carrinho[]> {
    return await this.repository.find({ relations: ['itens'], });
  }

  async findById(id: number): Promise<Carrinho | null> {
    return await this.repository.findOne({ where: { id }, relations: ['itens'] });
  }

  async findByQuery(query: FindOptionsWhere<Carrinho> & { skip: number; take: number; order: any; } | FindOptionsWhere<Carrinho>[] & { skip: number; take: number; order: any; }): Promise<Carrinho[] | null> {
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
      return await this.repository.find({ where: { ...query }, relations: ['itens'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['itens'] });
  }

  async findByQueryOne(query: FindOptionsWhere<Carrinho> | FindOptionsWhere<Carrinho>[]): Promise<Carrinho | null> {
    return await this.repository.findOne({ where: { ...query }, relations: ['itens'] });
  }

  async update(id: number, data: ICarrinho): Promise<Carrinho | null> {
    const carrinho = await this.repository.findOneBy({ id });
    if (!carrinho) return null;

    Object.assign(carrinho, data);
    return await this.repository.save(carrinho);
  }

  async delete(id: number): Promise<null> {
    const carrinho = await this.repository.findOneBy({ id });
    if (!carrinho) return null;
    await this.repository.remove(carrinho);
    return null;
  }
}



export class CarrinhoItemRepository implements ICarrinhoItemRepository {
  private repository: Repository<CarrinhoItem>;

  constructor() {
    this.repository = dataSource.getRepository(CarrinhoItem);
  }

  async save(data: ICarrinhoItem & { produto: { id: number }, carrinho: { id: number } }) {
    const item = await this.repository.create(data);
    return await this.repository.save(item);
  }

  async findAll(): Promise<CarrinhoItem[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<CarrinhoItem | null> {
    return await this.repository.findOneBy({ id });
  }

  async findByQuery(query: FindOptionsWhere<CarrinhoItem> | FindOptionsWhere<CarrinhoItem>[]): Promise<CarrinhoItem[]> {
    return await this.repository.findBy(query);
  }

  async findByQueryOne(query: FindOptionsWhere<CarrinhoItem> | FindOptionsWhere<CarrinhoItem>[]): Promise<CarrinhoItem | null> {
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<ICarrinhoItem>): Promise<CarrinhoItem | null> {
    const item = await this.repository.findOneBy({ id });
    if (!item) return null;

    await Object.assign(item, data);
    return await this.repository.save(item);
  }

  async delete(id: number): Promise<null> {
    const item = await this.repository.findOneBy({ id });
    if (!item) return null;
    await this.repository.remove(item);
    return null;
  }
}

