import { SalvamentoRepository } from '../repositories/Salvamento';
import { Salvamento } from '../entities/Salvamentos';
import { ISalvamento } from '../interfaces/salvamento';
import { filterProps } from '../utils/filterProps';
import { SALVAMENTO_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class SalvamentoService {
  private repository: SalvamentoRepository;

  constructor() {
    this.repository = new SalvamentoRepository();
  }

  async createSalvamento(data: ISalvamento) {
    const dataFilter = filterProps<ISalvamento>(data, [...SALVAMENTO_FIELDS] as (keyof ISalvamento)[]);

    if (!dataFilter.id_usuario || !dataFilter.tipo_conteudo || !dataFilter.id_conteudo) {
      throw new Error('Campos obrigatórios ausentes: id_usuario, tipo_conteudo, id_conteudo');
    }

    const salvamento = await this.repository.save({ ...dataFilter, postagem: { id: dataFilter.id_conteudo } });
    return salvamento;
  }

  async getSalvamentos({ queries, id, lastSalvamentoId, limit, order }: any): Promise<Salvamento[]> {
    let resultItems: any = null;
    const objectFilterQueries = { query: queries, lastSalvamentoId, limit, order }

    if (!lastSalvamentoId) {
      delete objectFilterQueries.lastSalvamentoId
    }
    if (!limit) {
      delete objectFilterQueries.limit
    }
    if (!order) {
      delete objectFilterQueries.order
    }

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      resultItems = await this.repository.findByQuery(objectFilterQueries);
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    delete objectFilterQueries.query

    resultItems = await this.repository.findAll(objectFilterQueries);
    return resultItems;
  }

  async updateSalvamento(id: number, data: Partial<ISalvamento>): Promise<Salvamento | null> {
    const dataFilter = filterProps<ISalvamento>(data, [...SALVAMENTO_FIELDS] as (keyof ISalvamento)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteSalvamento(id: number): Promise<null> {
    if (!id) throw new Error('ID do salvamento ausente');
    await this.repository.delete(id);
    return null;
  }
}
