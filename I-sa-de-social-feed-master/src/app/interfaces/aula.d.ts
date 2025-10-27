export interface IAula {
  id_aula?: number;
  id_modulo: number;
  titulo: string;
  tipo: string;
  url_conteudo: string;
  duracao_min?: number;
  created_at?: Date;
  updated_at?: Date;
}
