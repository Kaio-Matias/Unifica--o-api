import { PedidoRepository } from '../repositories/Pedido';
import { Pedido } from '../entities/Pedido';
import { IPedido } from '../interfaces/pedido';
import { filterProps } from '../utils/filterProps';
import { PEDIDO_FIELDS } from '../utils/listFields';

export class PedidoService {
  private repository: PedidoRepository;

  constructor() {
    this.repository = new PedidoRepository();
  }

  async createPedido(data: IPedido) {
    const dataFilter = filterProps<IPedido>(data, [...PEDIDO_FIELDS] as (keyof IPedido)[]);

    if (!dataFilter.status || !dataFilter.farmacia_id || !dataFilter.tipo_entrega || !dataFilter.user_id || !dataFilter.valor_total) {
      throw new Error('Campo(s) obrigatório(s) ausente(s)');
    }

    const pedido = await this.repository.save({ ...dataFilter, farmacia: { farmacia_id: dataFilter.farmacia_id }, });
    return pedido;
  }

  async getPedidos({ queries, id }: any): Promise<Pedido[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries, });
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repository.findAll();
    return resultItems;
  }

  async updatePedido(id: number, data: Partial<IPedido>): Promise<Pedido | null> {
    const dataFilter = filterProps<IPedido>(data, [...PEDIDO_FIELDS] as (keyof IPedido)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deletePedido(id: number): Promise<null> {
    if (!id) {
      throw new Error('Campo(s) obrigatório(s) ausente(s)');
    }
    await this.repository.delete(id);
    return null;
  }
}
