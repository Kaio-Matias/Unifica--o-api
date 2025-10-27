import { SeguidorRepository } from '../repositories/Seguidor';
import { Seguidor } from '../entities/Seguidores';
import { ISeguidor } from '../interfaces/seguidor';
import { filterProps } from '../utils/filterProps';
import { SEGUIDOR_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class SeguidorService {
  private repository: SeguidorRepository;

  constructor() {
    this.repository = new SeguidorRepository();
  }

  async createSeguidor(data: ISeguidor) {
    const dataFilter = filterProps<ISeguidor>(data, [...SEGUIDOR_FIELDS] as (keyof ISeguidor)[]);

    if (!dataFilter.seguidor_id || !dataFilter.seguindo_id) {
      throw new Error('Campos obrigatórios ausentes: seguidor_id, seguindo_id');
    }

    const seguidor = await this.repository.save(dataFilter);
    return seguidor;
  }

  async getSeguidores({ queries, id, lastSeguidorId, limit, order }: any): Promise<Seguidor[]> {
    let resultItems: any = null;
    const objectFilterQueries = { query: queries, lastSeguidorId, limit, order }

    if (!lastSeguidorId) {
      delete objectFilterQueries.lastSeguidorId
    }
    if (!limit) {
      delete objectFilterQueries.limit
    }
    if (!order) {
      delete objectFilterQueries.order
    }

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      resultItems = await this.repository.findByQuery(objectFilterQueries);
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    delete objectFilterQueries.query

    resultItems = await this.repository.findAll(objectFilterQueries);
    return resultItems;
  }

  async updateSeguidor(id: number, data: Partial<ISeguidor>): Promise<Seguidor | null> {
    const dataFilter = filterProps<ISeguidor>(data, [...SEGUIDOR_FIELDS] as (keyof ISeguidor)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteSeguidor(id: number): Promise<null> {
    if (!id) throw new Error('ID do seguidor ausente');
    await this.repository.delete(id);
    return null;
  }
}
