
import { Request, Response } from 'express';
import { QuizService } from '../../services/Quiz';

async function deleteQuiz(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const quizService = new QuizService();

    await quizService.deleteQuiz(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteQuiz;
