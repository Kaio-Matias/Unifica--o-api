import { TrilhaRepository } from '../repositories/Trilha';
import { Trilha } from '../entities/Trilhas';
import { ITrilha } from '../interfaces/trilha';
import { filterProps } from '../utils/filterProps';
import { TRILHA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class TrilhaService {
  private repository: TrilhaRepository;

  constructor() {
    this.repository = new TrilhaRepository();
  }

  async createTrilha(data: ITrilha) {
    const dataFilter = filterProps<ITrilha>(data, [...TRILHA_FIELDS] as (keyof ITrilha)[]);

    if (!dataFilter.titulo) {
      throw new Error('Campo obrigatório ausente: titulo');
    }

    const trilha = await this.repository.save(dataFilter);
    return trilha;
  }

  async getTrilhas({ queries, id }: any): Promise<Trilha[]> {
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

  async updateTrilha(id: number, data: Partial<ITrilha>): Promise<Trilha | null> {
    const dataFilter = filterProps<ITrilha>(data, [...TRILHA_FIELDS] as (keyof ITrilha)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteTrilha(id: number): Promise<null> {
    if (!id) throw new Error('ID da trilha ausente');
    await this.repository.delete(id);
    return null;
  }
}
