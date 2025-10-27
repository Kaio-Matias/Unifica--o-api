import { StoryRepository } from '../repositories/Story';
import { Story } from '../entities/Story';
import { IStory } from '../interfaces/story';
import { filterProps } from '../utils/filterProps';
import { STORY_FIELDS } from '../utils/listFields';

export class StoryService {
  private repository: StoryRepository;

  constructor() {
    this.repository = new StoryRepository();
  }

  async createStory(data: IStory): Promise<Story> {
    const dataFilter = filterProps<IStory>(data, [...STORY_FIELDS] as (keyof IStory)[]);

    if (!dataFilter.autor_id || !dataFilter.conteudo || !dataFilter.tipo_conteudo) {
      throw new Error('Campos obrigatórios ausentes: autor_id, conteudo, tipo_conteudo');
    }

    return await this.repository.save(dataFilter);
  }

  async getStories({ queries, id }: any): Promise<Story[] | Story | null> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
    } else if (queries) {
      resultItems = await this.repository.findByQuery(queries);
    } else if (id) {
      resultItems = await this.repository.findById(id);
    } else {
      resultItems = await this.repository.findAll();
    }

    return resultItems;
  }

  async updateStory(id: number, data: Partial<IStory>): Promise<Story | null> {
    const dataFilter = filterProps<IStory>(data, [...STORY_FIELDS] as (keyof IStory)[]);
    return await this.repository.update(id, dataFilter);
  }

  async deleteStory(id: number): Promise<null> {
    if (!id) throw new Error('ID do story ausente');
    return await this.repository.delete(id);
  }
}
