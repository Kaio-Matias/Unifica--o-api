
import { Request, Response } from 'express';
import { QuizService } from '../../services/Quiz';

async function createQuiz(req: Request, res: Response) {
  try {
    const body = req.body;
    const quizService = new QuizService();
    const quiz = await quizService.createQuiz(body);

    return res.status(201).json({ quiz, message: 'Quiz criado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createQuiz;
