import { PostagemRepository } from '../repositories/Postagem';
import { CategoriaPostagemRepository } from '../repositories/CategoriaPostagem';
import { Postagem } from '../entities/Postagens';
import { IPostagem } from '../interfaces/postagem';
import { filterProps } from '../utils/filterProps';
import { POSTAGEM_FIELDS } from '../utils/listFields';
import { CategoriaPostagem } from '@models/CategoriaPostagem';
import { In } from 'typeorm';

export class PostagemService {
  private repository: PostagemRepository;

  constructor() {
    this.repository = new PostagemRepository();
  }

  async createPostagem(data: IPostagem) {
    const dataFilter = filterProps<IPostagem & { id_localizacao: number }>(data, [...POSTAGEM_FIELDS] as (keyof IPostagem)[]);

    if (!dataFilter.conteudo || !dataFilter.autor_id || !dataFilter.tipo_conteudo) {
      throw new Error('Campos obrigatórios ausentes: conteudo, autor_id, tipo_conteudo');
    }

    let categoriasEntities: CategoriaPostagem[] = [];
    if (data.categorias && Array.isArray(data.categorias)) {
      const repositoryPostCategory = new CategoriaPostagemRepository(); // ou use um repository específico
      const ids = data.categorias.map(c => c.id_categoria);
      categoriasEntities = await repositoryPostCategory.findByQuery({ id_categoria: In(ids) });
    }

    const postagem = await this.repository.save({ ...dataFilter, categorias: categoriasEntities, localizacao: { id_localizacao: dataFilter.id_localizacao } });
    return postagem;
  }

  async getPostagens({ queries, id, lastPostId, limit, order }: any): Promise<Postagem[]> {
    let resultItems: any = null;
    const objectFilterQueries = { query: queries, lastPostId, limit, order }

    if (!lastPostId) {
      delete objectFilterQueries.lastPostId
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

  async updatePostagem(id: number, data: Partial<IPostagem>): Promise<Postagem | null> {
    const dataFilter = filterProps<IPostagem>(data, [...POSTAGEM_FIELDS] as (keyof IPostagem)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deletePostagem(id: number): Promise<null> {
    if (!id) throw new Error('ID da postagem ausente');
    await this.repository.delete(id);
    return null;
  }
}
