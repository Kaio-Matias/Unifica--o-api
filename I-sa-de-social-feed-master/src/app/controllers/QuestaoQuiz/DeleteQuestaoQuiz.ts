
import { Request, Response } from 'express';
import { QuestaoQuizService } from '../../services/QuestaoQuiz';

async function deleteQuestaoQuiz(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const questaoQuizService = new QuestaoQuizService();

    await questaoQuizService.deleteQuestaoQuiz(parseInt(id) );

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteQuestaoQuiz;
