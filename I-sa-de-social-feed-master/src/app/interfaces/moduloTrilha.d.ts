export interface IModuloTrilha {
  id_modulo?: number;
  id_trilha: number;
  titulo: string;
  descricao?: string;
  ordem: number;
  duracao_estimada_min?: number;
  created_at?: Date;
  updated_at?: Date;
}
