import { Request, Response } from 'express';
import { StoryService } from '../../services/Story';

export class StoryController {
  private service: StoryService;

  constructor() {
    this.service = new StoryService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const story = await this.service.createStory(req.body);
      return res.status(201).json(story);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const queries = req.query;

      const stories = await this.service.getStories({ queries, id: id ? Number(id) : undefined });
      return res.status(200).json(stories);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updated = await this.service.updateStory(Number(id), req.body);

      if (!updated) {
        return res.status(404).json({ message: 'Story não encontrado' });
      }

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.service.deleteStory(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
