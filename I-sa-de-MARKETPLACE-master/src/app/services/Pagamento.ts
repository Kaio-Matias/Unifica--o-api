import { PagamentoRepository } from '../repositories/Pagamento';
import { Pagamento } from '../entities/Pagamento';
import { IPagamento } from '../interfaces/pagamento';
import { filterProps } from '../utils/filterProps';
import { PAGAMENTO_FIELDS } from '../utils/listFields';

export class PagamentoService {
  private repository: PagamentoRepository;

  constructor() {
    this.repository = new PagamentoRepository();
  }

  async createPayment(data: IPagamento) {
    const dataFilter = filterProps<IPagamento>(data, [...PAGAMENTO_FIELDS] as (keyof IPagamento)[]);

    if (!dataFilter.status || !dataFilter.metodo || !dataFilter.pedido_id || !dataFilter.valor) {
      throw new Error('Campo(s) obrigatório(s) ausente(s)');
    }

    const payment = await this.repository.save({ ...dataFilter, pedido: { id: dataFilter.pedido_id } });
    return payment
  }

  async getPayments({ queries, id }: any): Promise<Pagamento[]> {
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

  async update(id: number, data: Partial<IPagamento>): Promise<Pagamento | null> {
    const dataFilter = filterProps<IPagamento>(data, [...PAGAMENTO_FIELDS] as (keyof IPagamento)[]);

    const payment = await this.repository.update(id, dataFilter);
    return payment
  }

  async delete(id: number): Promise<null> {
    if (!id) throw new Error('Campo(s) obrigatório(s) ausente(s)');
    await this.repository.delete(id);
    return null;
  }
}
