import { QuizRepository } from '../repositories/Quiz';
import { Quiz } from '../entities/Quiz';
import { IQuiz } from '../interfaces/quiz';
import { filterProps } from '../utils/filterProps';
import { QUIZ_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class QuizService {
  private repository: QuizRepository;

  constructor() {
    this.repository = new QuizRepository();
  }

  async createQuiz(data: IQuiz) {
    const dataFilter = filterProps<IQuiz>(data, [...QUIZ_FIELDS] as (keyof IQuiz)[]);

    if (!dataFilter.titulo || !dataFilter.descricao || !dataFilter.id_aula) {
      throw new Error('Campos obrigatórios ausentes: titulo, descricao, id_aula');
    }

    const quiz = await this.repository.save({ ...dataFilter, aula: { id_aula: dataFilter.id_aula } });
    return quiz;
  }

  async getQuizzes({ queries, id }: any): Promise<Quiz[]> {
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

  async updateQuiz(id: number, data: Partial<IQuiz>): Promise<Quiz | null> {
    const dataFilter = filterProps<IQuiz>(data, [...QUIZ_FIELDS] as (keyof IQuiz)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteQuiz(id: number): Promise<null> {
    if (!id) throw new Error('ID do quiz ausente');
    await this.repository.delete(id);
    return null;
  }
}
