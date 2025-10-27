import { ConversaRepository } from '../repositories/Conversa';
import { Conversa } from '../entities/Conversas';
import { IConversa } from '../interfaces/conversa';
import { filterProps } from '../utils/filterProps';
import { CONVERSA_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class ConversaService {
  private repository: ConversaRepository;

  constructor() {
    this.repository = new ConversaRepository();
  }

  async createConversa(data: IConversa) {
    const dataFilter = filterProps<IConversa>(data, [...CONVERSA_FIELDS] as (keyof IConversa)[]);

    if (!dataFilter.mensagem || !dataFilter.remetente_id || !dataFilter.destinatario_id) {
      throw new Error('Campos obrigatórios ausentes: mensagem, remetente_id, destinatario_id');
    }

    const conversa = await this.repository.save(dataFilter);
    return conversa;
  }

  async getConversas({ queries, id }: any): Promise<Conversa[]> {
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

  async updateConversa(id: number, data: Partial<IConversa>): Promise<Conversa | null> {
    const dataFilter = filterProps<IConversa>(data, [...CONVERSA_FIELDS] as (keyof IConversa)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteConversa(id: number): Promise<null> {
    if (!id) throw new Error('ID da conversa ausente');
    await this.repository.delete(id);
    return null;
  }
}
