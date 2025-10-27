import { InscricaoTrilhaRepository } from '../repositories/InscricaoTrilha';
import { InscricaoTrilha } from '../entities/InscricaoTrilha';
import { IInscricaoTrilha } from '../interfaces/inscricaoTrilha';
import { filterProps } from '../utils/filterProps';
import { INSCRICAO_TRILHA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class InscricaoTrilhaService {
  private repository: InscricaoTrilhaRepository;

  constructor() {
    this.repository = new InscricaoTrilhaRepository();
  }

  async createInscricaoTrilha(data: IInscricaoTrilha) {
    const dataFilter = filterProps<IInscricaoTrilha>(data, [...INSCRICAO_TRILHA_FIELDS] as (keyof IInscricaoTrilha)[]);

    if (!dataFilter.status || !dataFilter.id_usuario || !dataFilter.id_trilha) {
      throw new Error('Campos obrigatórios ausentes: status, id_usuario, id_trilha');
    }

    const inscricaoTrilha = await this.repository.save({ ...dataFilter, trilha: { id_trilha: dataFilter.id_trilha } });
    return inscricaoTrilha;
  }

  async getInscricoesTrilha({ queries, id }: any): Promise<InscricaoTrilha[]> {
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

  async updateInscricaoTrilha(id: number, data: Partial<IInscricaoTrilha>): Promise<InscricaoTrilha | null> {
    const dataFilter = filterProps<IInscricaoTrilha>(data, [...INSCRICAO_TRILHA_FIELDS] as (keyof IInscricaoTrilha)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteInscricaoTrilha(id: number): Promise<null> {
    if (!id) throw new Error('ID da inscrição da trilha ausente');
    await this.repository.delete(id);
    return null;
  }
}
