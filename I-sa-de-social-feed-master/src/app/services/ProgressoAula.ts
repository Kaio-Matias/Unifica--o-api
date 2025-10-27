import { ProgressoAulaRepository } from '../repositories/ProgressoAula';
import { ProgressoAula } from '../entities/ProgressoAula';
import { IProgressoAula } from '../interfaces/progressoAula';
import { filterProps } from '../utils/filterProps';
import { PROGRESSO_AULA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class ProgressoAulaService {
  private repository: ProgressoAulaRepository;

  constructor() {
    this.repository = new ProgressoAulaRepository();
  }

  async createProgressoAula(data: IProgressoAula) {
    const dataFilter = filterProps<IProgressoAula>(data, [...PROGRESSO_AULA_FIELDS] as (keyof IProgressoAula)[]);

    if (!dataFilter.status || !dataFilter.id_inscricao || !dataFilter.id_aula) {
      throw new Error('Campos obrigatórios ausentes: status, id_inscricao, id_aula');
    }

    const progressoAula = await this.repository.save({ ...dataFilter, inscricao: { id_inscricao: dataFilter.id_inscricao }, aula: { id_aula: dataFilter.id_aula } });
    return progressoAula;
  }

  async getProgressosAula({ queries, id }: any): Promise<ProgressoAula[]> {
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

  async updateProgressoAula(id: number, data: Partial<IProgressoAula>): Promise<ProgressoAula | null> {
    const dataFilter = filterProps<IProgressoAula>(data, [...PROGRESSO_AULA_FIELDS] as (keyof IProgressoAula)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteProgressoAula(id: number): Promise<null> {
    if (!id) throw new Error('ID do progresso da aula ausente');
    await this.repository.delete(id);
    return null;
  }
}
