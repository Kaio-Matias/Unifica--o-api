export interface IProgressoAula {
  id_progresso?: number;
  id_inscricao: number;
  id_aula: number;
  status: string;
  tempo_assistido_min?: number;
  ultima_visualizacao?: Date;
  concluido_em?: Date;
  created_at?: Date;
  updated_at?: Date;
}
