
import { Request, Response } from 'express';
import { QuizService } from '../../services/Quiz';

async function updateQuiz(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const quizService = new QuizService();

    const result = await quizService.updateQuiz(parseInt(id), body);

    return res.status(200).json({ result, message: 'Quiz atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateQuiz;
