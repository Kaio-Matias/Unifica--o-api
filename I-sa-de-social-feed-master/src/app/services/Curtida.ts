import { CurtidaRepository } from '../repositories/Curtida';
import { Curtida } from '../entities/Curtidas';
import { ICurtida } from '../interfaces/curtida';
import { filterProps } from '../utils/filterProps';
import { CURTIDA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class CurtidaService {
  private repository: CurtidaRepository;

  constructor() {
    this.repository = new CurtidaRepository();
  }

  async createCurtida(data: ICurtida) {
    const dataFilter = filterProps<ICurtida>(data, [...CURTIDA_FIELDS] as (keyof ICurtida)[]);

    if (!dataFilter.postagem_id || !dataFilter.autor_id) {
      throw new Error('Campos obrigatórios ausentes: postagem_id, autor_id');
    }

    const curtida = await this.repository.save({ ...dataFilter, postagem: { id: dataFilter.postagem_id } });
    return curtida;
  }

  async getCurtidas({ queries, id }: any): Promise<Curtida[]> {
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

  async updateCurtida(id: number, data: Partial<ICurtida>): Promise<Curtida | null> {
    const dataFilter = filterProps<ICurtida>(data, [...CURTIDA_FIELDS] as (keyof ICurtida)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteCurtida(id: number): Promise<null> {
    if (!id) throw new Error('ID da curtida ausente');
    await this.repository.delete(id);
    return null;
  }
}
