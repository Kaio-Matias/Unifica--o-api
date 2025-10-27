import { FarmaciaRepository } from '../repositories/Farmacia';
import { Farmacia } from '../entities/Farmacia';
import { IFarmacia } from '../interfaces/farmacia';
import { filterProps } from '../utils/filterProps';
import { FARMACIA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class FarmaciaService {
  private repository: FarmaciaRepository;

  constructor() {
    this.repository = new FarmaciaRepository();
  }

  async createFarmacia(data: IFarmacia) {
    const dataFilter = filterProps<IFarmacia>(data, [...FARMACIA_FIELDS] as (keyof IFarmacia)[]);

    if (!dataFilter.cnpj || !dataFilter.razao_social || !dataFilter.nm_fantasia || !dataFilter.resp_tecnico || !dataFilter.cpf_resp || !dataFilter.registro_resp) {
      throw new Error('Campos obrigatórios ausentes: cnpj, razao_social, nm_fantasia, resp_tecnico, cpf_resp, registro_resp');
    }

    const farmacia = await this.repository.save({ ...dataFilter, endereco: { id: dataFilter.endereco_id } });
    return farmacia;
  }

  async getFarmacias({ queries, cnpj, lastFarmaciaCNPJ, limit, order }: any): Promise<Farmacia[]> {
    let resultItems: any = null;
    const objectFilterQueries = { query: queries, lastFarmaciaCNPJ, limit, order }

    if (!lastFarmaciaCNPJ) {
      delete objectFilterQueries.lastFarmaciaCNPJ
    }
    if (!limit) {
      delete objectFilterQueries.limit
    }
    if (!order) {
      delete objectFilterQueries.order
    }

    if (queries && cnpj) {
      resultItems = await this.repository.findByQueryOne({ ...queries, cnpj });
    }

    if (queries) {
      resultItems = await this.repository.findByQuery(objectFilterQueries);
    }

    if (cnpj) {
      resultItems = await this.repository.findByCNPJ(cnpj);
    }

    if (queries || cnpj) {
      return resultItems;
    }

    delete objectFilterQueries.query

    resultItems = await this.repository.findAll(objectFilterQueries);
    return resultItems;
  }

  async updateFarmacia(cnpj: string, data: Partial<IFarmacia>): Promise<Farmacia | null> {
    const dataFilter = filterProps<IFarmacia>(data, [...FARMACIA_FIELDS] as (keyof IFarmacia)[]);

    return await this.repository.update(cnpj, dataFilter);
  }

  async deleteFarmacia(cnpj: string): Promise<null> {
    if (!cnpj) throw new Error('CNPJ da farmácia ausente');
    await this.repository.delete(cnpj);
    return null;
  }
}
