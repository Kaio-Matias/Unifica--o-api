import { ContactRepository } from '../repositories/Contato';
import { UserContactRepository } from '../repositories/UserContact';
import { UsuariosContatos } from '../entities/UsuariosContatos';
import { IUsuariosContatos } from '../interfaces/usuariosContato';
import { IContato } from '../interfaces/contato';
import { filterProps } from '../utils/filterProps';
import { CONTACT_FIELDS, USER_CONTACT_FIELDS } from '../utils/listFields';
import { UserRepository } from '../repositories/User';

export class UserContactService {
  private repositoryContact: ContactRepository;
  private repositoryUserContact: UserContactRepository;
  private repositoryUser: UserRepository;

  constructor() {
    this.repositoryContact = new ContactRepository();
    this.repositoryUserContact = new UserContactRepository();
    this.repositoryUser = new UserRepository();
  }

  async createUserContact(data: IUsuariosContatos): Promise<any> {
    const dataFilter = filterProps<IUsuariosContatos & IContato>(
      data,
      [...USER_CONTACT_FIELDS, ...CONTACT_FIELDS] as (keyof (IUsuariosContatos & IContato))[]
    );

    if (
      dataFilter.is_principal === null ||
      dataFilter.is_principal === undefined ||
      !dataFilter.tipo_contato ||
      !dataFilter.id_usuario ||
      !dataFilter.valor
    ) {
      return { message: 'Campos obrigatórios ausentes' };
    }

    const user: any = await this.repositoryUser.findById(dataFilter.id_usuario)

    const contact: any = await this.repositoryContact.save({ is_principal: dataFilter.is_principal, tipo_contato: dataFilter.tipo_contato, valor: dataFilter.valor, id_usuario: dataFilter.id_usuario, }, user);

    if (!contact) throw new Error('Contato não encontrado')

    await this.repositoryUserContact.save({ usuario: user, contato: contact });
    return contact;
  }

  async getContactUsers({ queries, id }: { queries?: any; id?: number }): Promise<UsuariosContatos[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repositoryContact.findByQueryOne({ ...queries, id });
      return resultItems;
    }

    if (queries) {
      resultItems = await this.repositoryContact.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repositoryContact.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repositoryContact.findAll();
    return resultItems;
  }

  async updateUser(id: number, data: Partial<IUsuariosContatos>): Promise<IContato | null | { message: string }> {
    const dataFilter = filterProps<IContato>(data, [...CONTACT_FIELDS] as (keyof IContato)[]);

    if (
      !dataFilter.valor
    ) {
      return { message: 'Campos obrigatórios ausentes' }
    }

    const contact = await this.repositoryContact.update(id, { ...dataFilter });

    return contact;
  }

  async deleteUser(id: number): Promise<null | { message: string }> {
    if (!id) return { message: 'Campos obrigatórios ausentes' };
    const contact = await this.repositoryContact.findById(id);

    const user = await this.repositoryUser.findById(contact?.usuario?.id);

    const messageError = { message: "Contato não encontrado" };
    const messageErrorContactUser = { message: "Contato de usuário não encontrado" };
    if (!contact) {
      return messageError;
    }

    const UserContact = await this.repositoryUserContact.repository
      .createQueryBuilder("uc")
      .where("uc.usuario_id = :usuarioId", { usuarioId: user.id })
      .andWhere("uc.contato_id = :contatoId", { contatoId: contact.id })
      .getOne();

    if (!UserContact) {
      return messageErrorContactUser;
    }

    await this.repositoryUserContact.delete(UserContact.id);
    await this.repositoryContact.delete(contact.id);
    return null;
  }
}
