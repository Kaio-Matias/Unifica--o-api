import { PromocaoRepository } from '../repositories/Promocao';
import { Promocao } from '../entities/Promocao';
import { IPromocao } from '../interfaces/promocao';
import { filterProps } from '../utils/filterProps';
import { PROMOCAO_FIELDS } from '../utils/listFields';
import { PharmacyRepository } from '../repositories/Pharmacy';

export class PromocaoService {
  private repositoryPharmacyPromocao: PromocaoRepository;
  private repositoryPharmacy: PharmacyRepository;

  constructor() {
    this.repositoryPharmacyPromocao = new PromocaoRepository();
    this.repositoryPharmacy = new PharmacyRepository();
  }

  async createPromocao(data: IPromocao) {
    const dataFilter = filterProps<IPromocao>(data, [...PROMOCAO_FIELDS] as (keyof IPromocao)[]);

    if (!dataFilter.farmacia_id || !dataFilter.titulo || !dataFilter.inicio || !dataFilter.fim) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const pharmacy = await this.repositoryPharmacy.findById(dataFilter.farmacia_id)

    if (!pharmacy) {
      throw new Error('Farmacia não encontrada');
    }

    const promocao = await this.repositoryPharmacyPromocao.save({...dataFilter, farmacia: { farmacia_id: dataFilter.farmacia_id },});
    return promocao
  }

  async getPromocao({ queries, id, farmacia_id }:any): Promise<Promocao[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repositoryPharmacyPromocao.findByQueryOne({ ...queries, id });
      return resultItems;
    }

    if (queries) {
      resultItems = await this.repositoryPharmacyPromocao.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repositoryPharmacyPromocao.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repositoryPharmacyPromocao.findAll();
    return resultItems;
  }

  async updatePromocao(id: number, data: Partial<IPromocao>): Promise<Promocao | null> {
    const dataFilter = filterProps<IPromocao>(data, [...PROMOCAO_FIELDS] as (keyof IPromocao)[]);

    if (!dataFilter.farmacia_id) {
      throw new Error('Campos obrigatórios ausentes');
    }
    const pharmacy = await this.repositoryPharmacy.findById(dataFilter.farmacia_id)

    if (!pharmacy) {
      throw new Error('Farmacia não encontrada');
    }
    const promocao = await this.repositoryPharmacyPromocao.update(id, dataFilter);
    return promocao
  }

  async deletePromocao({ id, farmacia_id }): Promise<null> {
    const pharmacy = await this.repositoryPharmacy.findById(farmacia_id)

    if (!pharmacy) {
      throw new Error('Farmacia não encontrada');
    }

    await this.repositoryPharmacyPromocao.delete(id)
    return null;
  }
}
