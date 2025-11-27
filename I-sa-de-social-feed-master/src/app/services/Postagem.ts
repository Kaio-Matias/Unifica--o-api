import { PostagemRepository } from '../repositories/Postagem';
import { CategoriaPostagemRepository } from '../repositories/CategoriaPostagem';
import { Postagem } from '../entities/Postagens';
import { IPostagem } from '../interfaces/postagem';
import { filterProps } from '../utils/filterProps';
import { POSTAGEM_FIELDS } from '../utils/listFields';
import { CategoriaPostagem } from '../entities/CategoriaPostagem'; // Verifique se o caminho da entidade está correto
import { In } from 'typeorm';

export class PostagemService {
  private repository: PostagemRepository;
  private categoriaRepository: CategoriaPostagemRepository;

  constructor() {
    this.repository = new PostagemRepository();
    this.categoriaRepository = new CategoriaPostagemRepository();
  }

  async createPostagem(data: any) { // Mudado para 'any' para facilitar manipulação inicial
    // Filtra apenas campos da postagem, mas preservamos id_localizacao manualmente
    const dataFilter = filterProps<IPostagem>(data, [...POSTAGEM_FIELDS] as (keyof IPostagem)[]);
    const idLocalizacao = data.id_localizacao;

    // Validação manual robusta
    if (!dataFilter.conteudo) throw new Error('Campos obrigatórios ausentes: conteudo');
    if (!dataFilter.autor_id) throw new Error('Campos obrigatórios ausentes: autor_id');
    if (!dataFilter.tipo_conteudo) throw new Error('Campos obrigatórios ausentes: tipo_conteudo');

    // Tratamento de Categorias
    let categoriasEntities: CategoriaPostagem[] = [];
    if (data.categorias && Array.isArray(data.categorias) && data.categorias.length > 0) {
      // Assume que data.categorias é array de objetos { id_categoria: 1 }
      const ids = data.categorias.map((c: any) => c.id_categoria).filter((id: any) => id);
      
      if (ids.length > 0) {
        categoriasEntities = await this.categoriaRepository.findByQuery({ 
            where: { id_categoria: In(ids) } // Ajuste conforme a sintaxe do seu repository customizado
        });
      }
    }

    // Montagem do objeto para salvar
    const payload: any = { 
        ...dataFilter, 
        categorias: categoriasEntities 
    };

    if (idLocalizacao) {
        payload.localizacao = { id_localizacao: idLocalizacao };
    }

    try {
        const postagem = await this.repository.save(payload);
        return postagem;
    } catch (error) {
        throw new Error(`Erro ao salvar postagem no banco: ${error.message}`);
    }
  }

  async getPostagens({ queries, id, lastPostId, limit, order }: any): Promise<Postagem[]> {
    // (Código original mantido com leve ajuste de segurança)
    const objectFilterQueries = { query: queries, lastPostId, limit, order };

    if (!lastPostId) delete objectFilterQueries.lastPostId;
    if (!limit) delete objectFilterQueries.limit;
    if (!order) delete objectFilterQueries.order;

    if (queries && id) {
      const result = await this.repository.findByQueryOne({ ...queries, id });
      return result ? [result] : [];
    }

    if (queries) {
      return await this.repository.findByQuery(objectFilterQueries);
    }

    if (id) {
      const result = await this.repository.findById(id);
      return result ? [result] : [];
    }

    delete objectFilterQueries.query;
    return await this.repository.findAll(objectFilterQueries);
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