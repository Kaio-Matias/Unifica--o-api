import { ComentarioRepository } from '../repositories/Comentario';
import { Comentario } from '../entities/Comentarios';
import { IComentario } from '../interfaces/comentario';
import { filterProps } from '../utils/filterProps';
import { COMENTARIO_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class ComentarioService {
  private repository: ComentarioRepository;

  constructor() {
    this.repository = new ComentarioRepository();
  }

  async createComentario(data: IComentario) {
    const dataFilter = filterProps<IComentario>(data, [...COMENTARIO_FIELDS] as (keyof IComentario)[]);

    if (!dataFilter.texto || !dataFilter.id_postagem || !dataFilter.autor_id) {
      throw new Error('Campos obrigatórios ausentes: texto, id_postagem, autor_id');
    }

    const body = { ...dataFilter, postagem: { id: dataFilter.id_postagem }, comentario_pai: { id: dataFilter.id_pai } }

    if (!dataFilter.id_pai) {
      delete body.comentario_pai
    }

    const comentario = await this.repository.save(body);
    return comentario;
  }

  async getComentarios({ queries, id }: any): Promise<Comentario[]> {
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

  async updateComentario(id: number, data: Partial<IComentario>): Promise<Comentario | null> {
    const dataFilter = filterProps<IComentario>(data, [...COMENTARIO_FIELDS] as (keyof IComentario)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteComentario(id: number): Promise<null> {
    if (!id) throw new Error('ID do comentário ausente');
    await this.repository.delete(id);
    return null;
  }
}
