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
    // Filtra os dados com base na interface IPedido
    const dataFilter = filterProps<IPedido>(data, [...PEDIDO_FIELDS] as (keyof IPedido)[]);

    // Validação manual dos campos obrigatórios
    // CORREÇÃO: Uso de 'user_id' em vez de 'id_usuario'
    if (
      !dataFilter.status ||
      !dataFilter.farmacia_id ||
      !dataFilter.tipo_entrega ||
      !dataFilter.user_id ||
      !dataFilter.valor_total
    ) {
      throw new Error('Campo(s) obrigatório(s) ausente(s)');
    }

    // Montagem do objeto para salvar no TypeORM
    // CORREÇÃO: Tipamos como 'any' temporariamente para evitar conflito estrito do TypeScript
    // entre a interface IPedido e a Entidade Pedido na hora de definir a relação 'farmacia'.
    const payload: any = {
      ...dataFilter,
      farmacia: { id: dataFilter.farmacia_id }, // Assume que a Farmácia tem chave primária 'id'
    };

    // Se a entidade Pharmacy usar 'id_farmacia' ou outro nome, ajuste a linha acima para:
    // farmacia: { id_farmacia: dataFilter.farmacia_id } ou farmacia: { farmacia_id: dataFilter.farmacia_id }

    const pedido = await this.repository.save(payload);
    return pedido;
  }

  async getPedidos({ queries, id }: any): Promise<Pedido[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
      // Retorna array mesmo que seja um item para manter consistência do tipo de retorno
      return resultItems ? [resultItems] : [];
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
      return resultItems;
    }

    if (id) {
      resultItems = await this.repository.findById(id);
      return resultItems ? [resultItems] : [];
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
      throw new Error('ID do pedido obrigatório');
    }
    await this.repository.delete(id);
    return null;
  }
}