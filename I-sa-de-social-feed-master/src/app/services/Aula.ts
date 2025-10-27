import { AulaRepository } from '../repositories/Aula';
import { Aula } from '../entities/Aulas';
import { IAula } from '../interfaces/aula';
import { filterProps } from '../utils/filterProps';
import { AULA_FIELDS } from '../utils/listFields';

export class AulaService {
  private repository: AulaRepository;

  constructor() {
    this.repository = new AulaRepository();
  }

  async createAula(data: IAula) {
    const dataFilter = filterProps<IAula>(data, [...AULA_FIELDS] as (keyof IAula)[]);

    if (!dataFilter.titulo || !dataFilter.tipo || !dataFilter.url_conteudo || !dataFilter.id_modulo) {
      throw new Error('Campos obrigatórios ausentes: titulo, tipo, url_conteudo, id_modulo');
    }

    const aula = await this.repository.save({ ...dataFilter, modulo: { id_modulo: dataFilter.id_modulo } });
    return aula;
  }

  async getAulas({ queries, id }: any): Promise<Aula[]> {
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

  async updateAula(id: number, data: Partial<IAula>): Promise<Aula | null> {
    const dataFilter = filterProps<IAula>(data, [...AULA_FIELDS] as (keyof IAula)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteAula(id: number): Promise<null> {
    if (!id) throw new Error('ID da aula ausente');
    await this.repository.delete(id);
    return null;
  }
}
