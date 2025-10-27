import { Router } from 'express';
import { StoryController } from '../controllers/Story';

const storyRoutes = Router();
const controller = new StoryController();

storyRoutes.post('/', controller.create.bind(controller));
storyRoutes.get('/:id?', controller.get.bind(controller));
storyRoutes.put('/:id', controller.update.bind(controller));
storyRoutes.delete('/:id', controller.delete.bind(controller));

export default storyRoutes;
