import { ModuloTrilhaRepository } from '../repositories/ModuloTrilha';
import { ModuloTrilha } from '../entities/ModulosTrilhas';
import { IModuloTrilha } from '../interfaces/moduloTrilha';
import { filterProps } from '../utils/filterProps';
import { MODULO_TRILHA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class ModuloTrilhaService {
  private repository: ModuloTrilhaRepository;

  constructor() {
    this.repository = new ModuloTrilhaRepository();
  }

  async createModuloTrilha(data: IModuloTrilha) {
    const dataFilter = filterProps<IModuloTrilha>(data, [...MODULO_TRILHA_FIELDS] as (keyof IModuloTrilha)[]);

    if (!dataFilter.titulo || !dataFilter.ordem || !dataFilter.id_trilha) {
      throw new Error('Campos obrigatórios ausentes: titulo, ordem, id_trilha');
    }

    const moduloTrilha = await this.repository.save({ ...dataFilter, trilha: { id_trilha: dataFilter.id_trilha } });
    return moduloTrilha;
  }

  async getModulosTrilha({ queries, id }: any): Promise<ModuloTrilha[]> {
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

  async updateModuloTrilha(id: number, data: Partial<IModuloTrilha>): Promise<ModuloTrilha | null> {
    const dataFilter = filterProps<IModuloTrilha>(data, [...MODULO_TRILHA_FIELDS] as (keyof IModuloTrilha)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteModuloTrilha(id: number): Promise<null> {
    if (!id) throw new Error('ID do módulo da trilha ausente');
    await this.repository.delete(id);
    return null;
  }
}
