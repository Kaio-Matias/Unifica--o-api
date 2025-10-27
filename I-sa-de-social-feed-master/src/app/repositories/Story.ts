import { Repository, FindOptionsWhere } from 'typeorm';
import { Story } from '../entities/Story';
import { IStory } from '../interfaces/story';
import { IStoryRepository } from '../interfaces/Repositories/storyRepository';
import dataSource from '../../database/typeorm';

export class StoryRepository implements IStoryRepository {
  private repository: Repository<Story>;

  constructor() {
    this.repository = dataSource.getRepository(Story);
  }

  async save(data: IStory): Promise<Story> {
    const story = this.repository.create(data);
    return await this.repository.save(story);
  }

  async update(id: number, data: Partial<IStory>): Promise<Story | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async findById(id: number): Promise<Story | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['localizacao'],
    });
  }

  async findByQuery(query: any): Promise<Story[]> {
    const objectFilter = { skip: query.skip, take: query.take, order: query.order };

    if (!query.skip) delete objectFilter.skip;
    if (!query.take) delete objectFilter.take;
    if (!query.order) delete objectFilter.order;

    delete query.skip;
    delete query.take;
    delete query.order;

    if ((objectFilter.skip || objectFilter.take || objectFilter.order) && Object.keys(query).length === 0) {
      return await this.repository.find({ ...objectFilter });
    }

    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({
        where: { ...query },
        relations: ['localizacao'],
        ...objectFilter,
      });
    }

    return await this.repository.find({
      where: query,
      relations: ['localizacao'],
    });
  }

  async findByQueryOne(query: FindOptionsWhere<IStory> | FindOptionsWhere<IStory>[]): Promise<Story | null> {
    return await this.repository.findOne({
      where: query,
      relations: ['localizacao'],
    });
  }

  async findAll(): Promise<Story[]> {
    return await this.repository.find({
      relations: ['localizacao'],
    });
  }

  async delete(id: number): Promise<null> {
    const story = await this.findById(id);
    if (!story) return null;
    await this.repository.remove(story);
    return null;
  }
}
