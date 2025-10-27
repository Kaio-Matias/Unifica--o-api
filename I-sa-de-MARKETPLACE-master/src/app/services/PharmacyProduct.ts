import { PharmacyProductRepository } from '../repositories/PharmacyProduct';
import { PharmacyRepository } from '../repositories/Pharmacy';
import { PharmacyProduct } from '../entities/PharmacyProduct';
import { IPharmacyProduct } from '../interfaces/pharmacy';
import { filterProps } from '../utils/filterProps';
import { PHARMACY_PRODUCT_FIELDS } from '../utils/listFields';

export class PharmacyProductService {
  private repositoryPharmacyProduct: PharmacyProductRepository;
  private repositoryPharmacy: PharmacyRepository;

  constructor() {
    this.repositoryPharmacyProduct = new PharmacyProductRepository();
    this.repositoryPharmacy = new PharmacyRepository();
  }

  async createPharmacyProduct(data: IPharmacyProduct) {
    const dataFilter = filterProps<IPharmacyProduct>(data, [...PHARMACY_PRODUCT_FIELDS] as (keyof IPharmacyProduct)[]);

    if (!dataFilter.farmacia_id || !dataFilter.medicamento_id || !dataFilter.preco || !dataFilter.estoque) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const pharmacy = await this.repositoryPharmacy.findById(dataFilter.farmacia_id)

    if (!pharmacy) {
      throw new Error('Farmacia não encontrada');
    }

    const product = await this.repositoryPharmacyProduct.save({ ...dataFilter, farmacia: { farmacia_id: dataFilter.farmacia_id }, medicamento: { medicamento_id: dataFilter.medicamento_id } });
    return product;
  }

  async getPharmacyProduct({ queries, id }: any): Promise<PharmacyProduct[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repositoryPharmacyProduct.findByQueryOne({ ...queries, id });
      return resultItems;
    }

    if (queries) {
      resultItems = await this.repositoryPharmacyProduct.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repositoryPharmacyProduct.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repositoryPharmacyProduct.findAll();
    return resultItems;
  }

  async updatePharmacyProduct(id: number, data: Partial<IPharmacyProduct>): Promise<PharmacyProduct | null> {
    const dataFilter = filterProps<IPharmacyProduct>(data, [...PHARMACY_PRODUCT_FIELDS] as (keyof IPharmacyProduct)[]);

    if (!dataFilter.farmacia_id) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const pharmacy = await this.repositoryPharmacy.findById(dataFilter.farmacia_id)

    const pharmacyProduct = await this.repositoryPharmacyProduct.findById(id)

    if (!pharmacyProduct) {
      throw new Error('Produto não encontrado');
    }
    if (!pharmacy) {
      throw new Error('Farmacia não encontrada');
    }

    const product = await this.repositoryPharmacyProduct.update(id, dataFilter);
    return product;
  }

  async deletePharmacyProduct(idProduct: number, idPharmarcy: number): Promise<null> {
    const pharmacy = await this.repositoryPharmacy.findById(idPharmarcy);
    if (!pharmacy) throw new Error('Farmacia não encontrada');

    if (!idProduct) {
      throw new Error('idProduct not found');
    }

    await this.repositoryPharmacyProduct.findById(idProduct);

    return null;
  }
}
