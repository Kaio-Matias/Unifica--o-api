import { UnidadeSaudeRepository } from '../repositories/UnidadeSaude';
import { UnidadeSaude } from '../entities/UnidadeSaude';
import { IUnidadeSaude } from '../interfaces/unidadeSaude';
import { filterProps } from '../utils/filterProps';
import { UNIDADE_SAUDE_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class UnidadeSaudeService {
  private repository: UnidadeSaudeRepository;

  constructor() {
    this.repository = new UnidadeSaudeRepository();
  }

  async createUnidadeSaude(data: IUnidadeSaude) {
    const dataFilter = filterProps<IUnidadeSaude>(data, [...UNIDADE_SAUDE_FIELDS] as (keyof IUnidadeSaude)[]);

    if (!dataFilter.cnpj || !dataFilter.nm_fantasia || !dataFilter.tipo_unidade || !dataFilter.resp_legal || !dataFilter.cpf_resp || !dataFilter.registroResp || !dataFilter.endereco_id) {
      throw new Error('Campos obrigatórios ausentes: cnpj, nm_fantasia, tipo_unidade, resp_legal, cpf_resp, registroResp, endereco_id');
    }

    const unidadeSaude = await this.repository.save({ ...dataFilter, endereco: { id: dataFilter.endereco_id } });
    return unidadeSaude;
  }

  async getUnidadesSaude({ queries, cnpj ,lastUnidadeSaudeCNPJ,limit, order }: any): Promise<UnidadeSaude[]> {
    let resultItems: any = null;
    const objectFilterQueries = { query: queries,lastUnidadeSaudeCNPJ, limit, order }

    if (!lastUnidadeSaudeCNPJ) {
      delete objectFilterQueries.lastUnidadeSaudeCNPJ
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

  async updateUnidadeSaude(cnpj: string, data: Partial<IUnidadeSaude>): Promise<UnidadeSaude | null> {
    const dataFilter = filterProps<IUnidadeSaude>(data, [...UNIDADE_SAUDE_FIELDS] as (keyof IUnidadeSaude)[]);

    return await this.repository.update(cnpj, dataFilter);
  }

  async deleteUnidadeSaude(cnpj: string): Promise<null> {
    if (!cnpj) throw new Error('CNPJ da unidade de saúde ausente');
    await this.repository.delete(cnpj);
    return null;
  }
}
