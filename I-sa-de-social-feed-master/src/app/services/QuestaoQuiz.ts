import { QuestaoQuizRepository } from '../repositories/QuestaoQuiz';
import { QuestaoQuiz } from '../entities/QuestaoQuiz';
import { IQuestaoQuiz } from '../interfaces/questaoQuiz';
import { filterProps } from '../utils/filterProps';
import { QUESTAO_QUIZ_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class QuestaoQuizService {
  private repository: QuestaoQuizRepository;

  constructor() {
    this.repository = new QuestaoQuizRepository();
  }

  async createQuestaoQuiz(data: IQuestaoQuiz) {
    const dataFilter = filterProps<IQuestaoQuiz>(data, [...QUESTAO_QUIZ_FIELDS] as (keyof IQuestaoQuiz)[]);

    if (!dataFilter.texto_questao || !dataFilter.tipo || !dataFilter.resposta_correta || !dataFilter.id_quiz) {
      throw new Error('Campos obrigatórios ausentes: texto_questao, tipo, resposta_correta, id_quiz');
    }

    const questaoQuiz = await this.repository.save({ ...dataFilter, quiz: { id_quiz: dataFilter.id_quiz } });
    return questaoQuiz;
  }

  async getQuestoesQuiz({ queries, id }: any): Promise<QuestaoQuiz[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repository.findAll();
    return resultItems;
  }

  async updateQuestaoQuiz(id: number, data: Partial<IQuestaoQuiz>): Promise<QuestaoQuiz | null> {
    const dataFilter = filterProps<IQuestaoQuiz>(data, [...QUESTAO_QUIZ_FIELDS] as (keyof IQuestaoQuiz)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteQuestaoQuiz(id: number): Promise<null> {
    if (!id) throw new Error('ID da questão do quiz ausente');
    await this.repository.delete(id);
    return null;
  }
}
