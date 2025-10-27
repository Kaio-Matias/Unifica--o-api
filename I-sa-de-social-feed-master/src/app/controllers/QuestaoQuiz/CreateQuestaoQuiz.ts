
import { Request, Response } from 'express';
import { QuestaoQuizService } from '../../services/QuestaoQuiz';

async function createQuestaoQuiz(req: Request, res: Response) {
  try {
    const body = req.body;
    const questaoQuizService = new QuestaoQuizService();
    const questao = await questaoQuizService.createQuestaoQuiz(body);

    return res.status(201).json({ questao, message: 'Questão de quiz criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createQuestaoQuiz;
