export interface IStory {
  id?: number;
  autor_id: number;
  conteudo: string;
  tipo_conteudo: string;
  duracao_segundos?: number;
  dt_publicacao?: Date;
  visualizacoes?: number;
  curtidas?: number;
  compartilhamentos?: number;
  expirado?: boolean;
  ativo?: boolean;
  hashtags?: string;
  idioma?: string;
  id_localizacao?: number;
  tempo_medio_visualiz?: number;
  engajamento_score?: number;
  created_at?: Date;
  updated_at?: Date;
}
