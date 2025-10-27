import { CategoriaPostagemRepository } from '../repositories/CategoriaPostagem';
import { CategoriaPostagem } from '../entities/CategoriaPostagem';
import { ICategoriaPostagem } from '../interfaces/categoriaPostagem';
import { filterProps } from '../utils/filterProps';
import { CATEGORIA_POSTAGEM_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class CategoriaPostagemService {
  private repository: CategoriaPostagemRepository;

  constructor() {
    this.repository = new CategoriaPostagemRepository();
  }

  async createCategoriaPostagem(data: ICategoriaPostagem) {
    const dataFilter = filterProps<ICategoriaPostagem>(data, [...CATEGORIA_POSTAGEM_FIELDS] as (keyof ICategoriaPostagem)[]);

    if (!dataFilter.nome) {
      throw new Error('Campo obrigatório ausente: nome');
    }

    const categoriaPostagem = await this.repository.save(dataFilter);
    return categoriaPostagem;
  }

  async getCategoriasPostagem({ queries, id }: any): Promise<CategoriaPostagem[]> {
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

  async updateCategoriaPostagem(id: number, data: Partial<ICategoriaPostagem>): Promise<CategoriaPostagem | null> {
    const dataFilter = filterProps<ICategoriaPostagem>(data, [...CATEGORIA_POSTAGEM_FIELDS] as (keyof ICategoriaPostagem)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteCategoriaPostagem(id: number): Promise<null> {
    if (!id) throw new Error('ID da categoria de postagem ausente');
    await this.repository.delete(id);
    return null;
  }
}
