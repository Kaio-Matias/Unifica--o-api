
// Postagem Interface
export interface IPostagem {
  id?: number;
  conteudo: string;
  dt_postagem: Date;
  autor_id: number;
  tipo_conteudo: string;
  duracao_segundos?: number;
  categorias?: any;
  idioma?: string;
  localizacao_postagem?: string;
  id_localizacao?: number
  hashtags?: string;
  visualizacoes: number;
  curtidas: number;
  compartilhamentos: number;
  comentarios_qtd: number;
  tempo_medio_visualiz?: number;
  engajamento_score?: number;
  created_at?: Date;
  updated_at?: Date;
}
