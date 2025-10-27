
import { Request, Response } from 'express';
import { QuestaoQuizService } from '../../services/QuestaoQuiz';

async function updateQuestaoQuiz(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const questaoQuizService = new QuestaoQuizService();

    const result = await questaoQuizService.updateQuestaoQuiz(parseInt(id), body);

    return res.status(200).json({ result, message: 'Questão de quiz atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateQuestaoQuiz;
