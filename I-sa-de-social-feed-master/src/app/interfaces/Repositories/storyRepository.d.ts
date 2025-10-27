import { IStory } from '../story';
import { Story } from '../../entities/Story';
import { FindOptionsWhere } from 'typeorm';

export interface IStoryRepository {
  save(data: IStory): Promise<Story>;
  update(id: number, data: Partial<IStory>): Promise<Story | null>;
  findById(id: number): Promise<Story | null>;
  findByQuery(query: any): Promise<Story[]>;
  findByQueryOne(query: FindOptionsWhere<IStory> | FindOptionsWhere<IStory>[]): Promise<Story | null>;
  findAll(): Promise<Story[]>;
  delete(id: number): Promise<null>;
}
