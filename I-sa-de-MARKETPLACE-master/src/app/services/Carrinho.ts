import { CarrinhoItemRepository, CarrinhoRepository } from '../repositories/Carrinho';
import { ICarrinho, ICarrinhoItem } from '../interfaces/carrinho';
import { filterProps } from '../utils/filterProps';
import { CARRINHO_FIELDS, CARRINHO_ITEM_FIELDS } from '../utils/listFields';
import { CarrinhoItem } from '../entities';

export class CarrinhoService {
  private repositoryCarrinho: CarrinhoRepository;
  private repositoryCarrinhoItem: CarrinhoItemRepository;

  constructor() {
    this.repositoryCarrinho = new CarrinhoRepository();
    this.repositoryCarrinhoItem = new CarrinhoItemRepository();
  }

  async createCarrinho(data: ICarrinho & ICarrinhoItem) {
    const dataFilter = filterProps<ICarrinho & ICarrinhoItem>(data, [
      ...CARRINHO_FIELDS,
      ...CARRINHO_ITEM_FIELDS,
    ] as (keyof ICarrinho & ICarrinhoItem)[]);

    if (!dataFilter.user_id) {
      return { message: 'Campos obrigatórios ausentes: user_id' };
    }

    if (!dataFilter.produto_id) {
      return { message: 'Campos obrigatórios ausentes: produto_id' };
    }

    if (!dataFilter.quantidade) {
      return { message: 'Campos obrigatórios ausentes: produto_id' };
    }

    const result = dataFilter.carrinho_id
      ? { id: dataFilter.carrinho_id }
      : await this.repositoryCarrinho.save({ user_id: data.user_id });

    const resultItemCarrinho = await this.repositoryCarrinhoItem.save({
      produto_id: dataFilter.produto_id,
      produto: { id: dataFilter.produto_id },
      carrinho_id: result.id,
      carrinho: { id: result.id },
      quantidade: dataFilter.quantidade,
    });

    return resultItemCarrinho;
  }

  async getCarrinhoItems({ queries, id, user_id }: any): Promise<CarrinhoItem[]> {
    if (!user_id) {
      throw new Error('Campos obrigatórios ausentes: user_id');
    }

    const resultCarrinho = await this.repositoryCarrinho.findByQueryOne({ user_id });
    let resultItemsCarrinho: any = null;

    if (queries && id) {
      resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQueryOne({ user_id, carrinho: { id: resultCarrinho?.id }, ...queries, id });
    }

    if (queries) {
      resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQuery({ user_id, carrinho: { id: resultCarrinho?.id }, ...queries, });
    }

    if (id) {
      resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQueryOne({ id })
    }

    if (queries || id) {
      return resultItemsCarrinho;
    }

    resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQuery({ carrinho: { id: resultCarrinho?.id } });
    return resultItemsCarrinho;
  }

  async getCarrinhoItemsAdmin({ queries, id }): Promise<CarrinhoItem[]> {
    let resultItemsCarrinho: any = null;

    if (queries && id) {
      resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQuery({ ...queries, });
    }

    if (id) {
      resultItemsCarrinho = await this.repositoryCarrinhoItem.findByQueryOne({ id })
    }

    if (queries || id) {
      return resultItemsCarrinho;
    }

    resultItemsCarrinho = await this.repositoryCarrinhoItem.findAll();
    return resultItemsCarrinho;
  }

  async updateCarrinho(id: number, data: Partial<ICarrinhoItem>): Promise<ICarrinhoItem | []> {
    const dataFilter = filterProps<ICarrinhoItem>(data, [...CARRINHO_ITEM_FIELDS] as (keyof ICarrinhoItem)[]);

    const carrinho = await this.repositoryCarrinhoItem.findById(id);

    if (!carrinho) return [];

    if (!dataFilter.produto_id) {
      throw new Error('Campo obrigatório ausente: produto_id');
    }
    if (!dataFilter.quantidade) {
      throw new Error('Campo obrigatório ausente: quantidade');
    }

    const resultItemCarrinho = await this.repositoryCarrinhoItem.update(id, {
      produto_id: dataFilter.produto_id,
      quantidade: dataFilter.quantidade,
    });

    return resultItemCarrinho ?? [];
  }

  async deleteCarrinho({ idCarrinho }): Promise<null> {
    let carrinho;

    if (idCarrinho) {
      carrinho = await this.repositoryCarrinho.findById(idCarrinho);
    }

    if (carrinho) {
      await this.repositoryCarrinho.delete(idCarrinho)
    }

    return null;
  }

  async deleteCarrinhoItems({ idCarrinhoItem }): Promise<null> {
    let carrinhoItem;

    if (idCarrinhoItem) {
      carrinhoItem = await this.repositoryCarrinhoItem.findById(idCarrinhoItem);
    }

    if (carrinhoItem) {
      await this.repositoryCarrinhoItem.delete(idCarrinhoItem)
    }

    return null;
  }
}
