import { LocalizacaoRepository } from '../repositories/Localizacao';
import { Localizacao } from '../entities/Localizacao';
import { ILocalizacao } from '../interfaces/localizacao';
import { filterProps } from '../utils/filterProps';
import { LOCALIZACAO_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class LocalizacaoService {
  private repository: LocalizacaoRepository;

  constructor() {
    this.repository = new LocalizacaoRepository();
  }

  async createLocalizacao(data: ILocalizacao) {
    const dataFilter = filterProps<ILocalizacao>(data, [...LOCALIZACAO_FIELDS] as (keyof ILocalizacao)[]);

    if (!dataFilter.latitude || !dataFilter.longitude || !dataFilter.id_usuario) {
      throw new Error('Campos obrigatórios ausentes: latitude, longitude, id_usuario');
    }

    const localizacao = await this.repository.save(dataFilter);
    return localizacao;
  }

  async getLocalizacoes({ queries, id }: any): Promise<Localizacao[]> {
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

  async updateLocalizacao(id: number, data: Partial<ILocalizacao>): Promise<Localizacao | null> {
    const dataFilter = filterProps<ILocalizacao>(data, [...LOCALIZACAO_FIELDS] as (keyof ILocalizacao)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteLocalizacao(id: number): Promise<null> {
    if (!id) throw new Error('ID da localização ausente');
    await this.repository.delete(id);
    return null;
  }
}
