// src/services/PedidoItem.ts

import { PedidoItemRepository } from '../repositories/PedidoItem';
import { PedidoItem } from '../entities/PedidoItems';
import { filterProps } from '../utils/filterProps';

const PEDIDO_ITEM_FIELDS: (keyof PedidoItem)[] = [
  'pedido_id',
  'produto_id',
  'titulo',
  'unit_price',
  'quantity',
  'description',
  'picture_url',
  'currency_id',
  'category_id',
  'pedido',
  'produto',
];

export class PedidoItemService {
  private repository: PedidoItemRepository;

  constructor() {
    this.repository = new PedidoItemRepository();
  }

  async createPedidoItem(data: Partial<PedidoItem>) {
    const dataFilter = filterProps<PedidoItem>(data, PEDIDO_ITEM_FIELDS);

    if (!dataFilter.titulo || !dataFilter.unit_price || !dataFilter.quantity) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.save(dataFilter);
  }

  async createManyPedidoItems(dataArray: Partial<PedidoItem>[]) {
    const filteredData = dataArray.map(item =>
      filterProps<PedidoItem>(item, PEDIDO_ITEM_FIELDS)
    );

    return await this.repository.saveMany(filteredData);
  }

  async getPedidoItems({ queries, id }: any): Promise<PedidoItem[] | PedidoItem | null> {
    if (queries && id) {
      return await this.repository.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      return await this.repository.findByQuery({ ...queries });
    }

    if (id) {
      return await this.repository.findById(id);
    }

    return await this.repository.findAll();
  }

  async updatePedidoItem(id: number, data: Partial<PedidoItem>): Promise<PedidoItem | null> {
    const dataFilter = filterProps<PedidoItem>(data, PEDIDO_ITEM_FIELDS);
    return await this.repository.update(id, dataFilter);
  }

  async deletePedidoItem(id: number): Promise<null> {
    const item = await this.repository.findById(id);
    if (!item) return null;
    await this.repository.delete(id);
    return null;
  }
}
