import { ReceitaDigitalRepository } from '../repositories/ReceitaDigital';
import { ReceitaDigital } from '../entities/ReceitaDigital';
import { IReceitaDigital } from '../interfaces/receitaDigital';
import { filterProps } from '../utils/filterProps';
import { RECEITA_DIGITAL_FIELDS } from '../utils/listFields';

export class ReceitaDigitalService {
  private repository: ReceitaDigitalRepository;

  constructor() {
    this.repository = new ReceitaDigitalRepository();
  }

  async createReceitaDigital(data: IReceitaDigital) {
    const dataFilter = filterProps<IReceitaDigital>(data, [...RECEITA_DIGITAL_FIELDS] as (keyof IReceitaDigital)[]);

    if (!dataFilter.user_id || !dataFilter.medico_id || !dataFilter.arquivo_url || !dataFilter.validade) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const receita = await this.repository.save(dataFilter);
    return receita
  }

  async getReceitaDigital({ queries, id }: any): Promise<ReceitaDigital[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
      return resultItems;
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
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

  async updateReceitaDigital(id: number, data: Partial<IReceitaDigital>): Promise<ReceitaDigital | null> {
    const dataFilter = filterProps<IReceitaDigital>(data, [...RECEITA_DIGITAL_FIELDS] as (keyof IReceitaDigital)[]);
    return await this.repository.update(id, dataFilter);
  }

  async deleteReceitaDigital(id: number): Promise<null> {
    if (!id) return null;
    await this.repository.delete(id);
    return null;
  }
}
