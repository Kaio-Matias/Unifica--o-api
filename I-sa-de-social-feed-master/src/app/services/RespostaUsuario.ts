// <<< CORREÇÃO AQUI: Alterado de '../repositories/RespostaUsuario' para '../repositories/respostaUsuario'
import { RespostaUsuarioRepository } from '../repositories/respostaUsuario'; 
import { RespostaUsuario } from '../entities/RespostaUsuario';
import { IRespostaUsuario } from '../interfaces/respostaUsuario';
import { filterProps } from '../utils/filterProps';
import { RESPOSTA_USUARIO_FIELDS } from '../utils/listFields';

export class RespostaUsuarioService {
  private repository: RespostaUsuarioRepository;

  constructor() {
    this.repository = new RespostaUsuarioRepository();
  }

  async createRespostaUsuario(data: IRespostaUsuario) {
    const dataFilter = filterProps<IRespostaUsuario>(data, [...RESPOSTA_USUARIO_FIELDS] as (keyof IRespostaUsuario)[]);

    if (!dataFilter.id_questao || !dataFilter.id_usuario || !dataFilter.resposta_fornecida || dataFilter.correta === undefined || !dataFilter.data_resposta) {
      throw new Error('Campos obrigatórios ausentes: id_questao, id_usuario, resposta_fornecida, correta, data_resposta');
    }

    const respostaUsuarioGet = await this.repository.findByQueryOne({ questao: { id_questao: dataFilter.id_questao }, id_usuario: dataFilter.id_usuario });

    if (respostaUsuarioGet) {
      const respostaUsuarioUpdate = await this.repository.update(respostaUsuarioGet.id_resposta, dataFilter);
      return respostaUsuarioUpdate;
    }

    const respostaUsuario = await this.repository.save({ ...dataFilter, questao: { id_questao: dataFilter.id_questao } });
    return respostaUsuario;
  }

  async getRespostasUsuario({ queries, id }: any): Promise<RespostaUsuario[]> {
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

  async updateRespostaUsuario(id: number, data: Partial<IRespostaUsuario>): Promise<RespostaUsuario | null> {
    const dataFilter = filterProps<IRespostaUsuario>(data, [...RESPOSTA_USUARIO_FIELDS] as (keyof IRespostaUsuario)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteRespostaUsuario(id: number): Promise<null> {
    if (!id) throw new Error('ID da resposta do usuário ausente');
    await this.repository.delete(id);
    return null;
  }
}