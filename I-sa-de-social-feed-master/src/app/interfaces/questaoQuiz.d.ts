export interface IQuestaoQuiz {
  id_questao?: number;
  id_quiz: number;
  texto_questao: string;
  tipo: string;
  resposta_correta: string;
  quiz?: {
    id_quiz: number;
  };
  created_at?: Date;
  updated_at?: Date;
}
