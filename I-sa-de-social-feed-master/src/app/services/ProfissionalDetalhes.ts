import { ProfissionalDetalhesRepository } from '../repositories/ProfissionalDetalhes';
import { ProfissionalDetalhes } from '../entities/ProfissionalDetalhes';
import { IProfissionalDetalhes } from '../interfaces/profissionalDetalhes';
import { filterProps } from '../utils/filterProps';
import { PROFISSIONAL_DETALHES_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class ProfissionalDetalhesService {
  private repository: ProfissionalDetalhesRepository;

  constructor() {
    this.repository = new ProfissionalDetalhesRepository();
  }

  async createProfissionalDetalhes(data: IProfissionalDetalhes) {
    const dataFilter = filterProps<IProfissionalDetalhes>(data, [...PROFISSIONAL_DETALHES_FIELDS] as (keyof IProfissionalDetalhes)[]);

    if (!dataFilter.area_atuacao || !dataFilter.registro_prof || !dataFilter.est_atuacao || !dataFilter.id_user) {
      throw new Error('Campos obrigatórios ausentes: area_atuacao, registro_prof, est_atuacao, id_user');
    }

    const profissionalDetalhes = await this.repository.save(dataFilter);
    return profissionalDetalhes;
  }

  async getProfissionaisDetalhes({ queries, id }: any): Promise<ProfissionalDetalhes[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
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

  async updateProfissionalDetalhes(id: number, data: Partial<IProfissionalDetalhes>): Promise<ProfissionalDetalhes | null> {
    const dataFilter = filterProps<IProfissionalDetalhes>(data, [...PROFISSIONAL_DETALHES_FIELDS] as (keyof IProfissionalDetalhes)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteProfissionalDetalhes(id: number): Promise<null> {
    if (!id) throw new Error('ID dos detalhes do profissional ausente');
    await this.repository.delete(id);
    return null;
  }
}
