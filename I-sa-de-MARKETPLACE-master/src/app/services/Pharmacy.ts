import { PharmacyRepository } from '../repositories/Pharmacy';
import { Pharmacy } from '../entities/Pharmacy';
import { IPharmacy } from '../interfaces/pharmacy';
import { filterProps } from '../utils/filterProps';
import { PHARMACY_FIELDS } from '../utils/listFields';

export class PharmacyService {
  private repository: PharmacyRepository;

  constructor() {
    this.repository = new PharmacyRepository();
  }

  async createPharmacy(data: IPharmacy) {
    const dataFilter = filterProps<IPharmacy>(data, [...PHARMACY_FIELDS] as (keyof IPharmacy)[]);

    if (!dataFilter.nome || !dataFilter.cnpj || !dataFilter.endereco || !dataFilter.cidade || !dataFilter.estado || !dataFilter.latitude || !dataFilter.longitude) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const pharmacy = await this.repository.save(dataFilter);
    return pharmacy
  }

  async getPharmacies({ queries, id }: any): Promise<Pharmacy[]> {
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

  async updatePharmacy(id: number, data: Partial<IPharmacy>): Promise<Pharmacy | null> {
    const dataFilter = filterProps<IPharmacy>(data, [...PHARMACY_FIELDS] as (keyof IPharmacy)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deletePharmarcy(id: number): Promise<null> {
    if (!id) throw new Error('Campos obrigatórios ausentes');
    await this.repository.delete(id);
    return null;
  }
}
