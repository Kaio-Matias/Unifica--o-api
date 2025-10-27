export interface IQuiz {
  id_quiz?: number;
  id_aula: number;
  titulo: string;
  descricao: string;
  created_at?: Date;
  updated_at?: Date;
}
