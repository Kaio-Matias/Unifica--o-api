import { NotificacaoRepository } from '../repositories/Notificacao';
import { Notificacao } from '../entities/Notificacoes';
import { INotificacao } from '../interfaces/notificacao';
import { filterProps } from '../utils/filterProps';
import { NOTIFICACAO_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class NotificacaoService {
  private repository: NotificacaoRepository;

  constructor() {
    this.repository = new NotificacaoRepository();
  }

  async createNotificacao(data: INotificacao) {
    const dataFilter = filterProps<INotificacao>(data, [...NOTIFICACAO_FIELDS] as (keyof INotificacao)[]);

    if (!dataFilter.tipo_notificacao || !dataFilter.id_usuario) {
      throw new Error('Campos obrigatórios ausentes: tipo_notificacao, id_usuario');
    }

    const notificacao = await this.repository.save(dataFilter);
    return notificacao;
  }

  async getNotificacoes({ queries, id, lastNotificationId, limit, order }: any): Promise<Notificacao[]> {
    let resultItems: any = null;
    const objectFilterQueries = { query: queries, lastNotificationId, limit, order }

    if (!lastNotificationId) {
      delete objectFilterQueries.lastNotificationId
    }
    if (!limit) {
      delete objectFilterQueries.limit
    }
    if (!order) {
      delete objectFilterQueries.order
    }

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_notificacao: id });
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

  async updateNotificacao(id: number, data: Partial<INotificacao>): Promise<Notificacao | null> {
    const dataFilter = filterProps<INotificacao>(data, [...NOTIFICACAO_FIELDS] as (keyof INotificacao)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteNotificacao(id: number): Promise<null> {
    if (!id) throw new Error('ID da notificação ausente');
    await this.repository.delete(id);
    return null;
  }
}
