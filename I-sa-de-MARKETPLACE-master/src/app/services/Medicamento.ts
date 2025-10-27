import { MedicamentoRepository } from '../repositories/Medicamento';
import { Medicamento } from '../entities/Medicamento';
import { IMedicamento } from '../interfaces/medicamento';
import { filterProps } from '../utils/filterProps';
import { MEDICAMENTO_FIELDS } from '../utils/listFields';

export class MedicamentoService {
  private repository: MedicamentoRepository;

  constructor() {
    this.repository = new MedicamentoRepository();
  }

  async createMedicamento(data: IMedicamento) {
    const dataFilter = filterProps<IMedicamento>(data, [...MEDICAMENTO_FIELDS] as (keyof IMedicamento)[]);

    if ( !dataFilter.nome || !dataFilter.principio_ativo) {
      throw new Error('Campo(s) obrigatório(s) ausente(s)');
    }

    const medicamento = await this.repository.save(dataFilter);
    return medicamento
  }

  async getMedicamento({ queries, id }:any): Promise<Medicamento[]> {

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

  async updateMedicamento(id: number, data: Partial<IMedicamento>): Promise<Medicamento | null> {
    const dataFilter = filterProps<IMedicamento>(data, [...MEDICAMENTO_FIELDS] as (keyof IMedicamento)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteMedicamento(id: number): Promise<null> {
    const medicamento = await this.repository.findById(id);
    if (!medicamento) return null;
    await this.repository.delete(id);
    return null;
  }
}
