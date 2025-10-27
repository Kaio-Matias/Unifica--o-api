
export interface IMedicamento {
  id?: number;
  nome: string;
  principio_ativo: string;
  tarja?: string;
  controlado: boolean;
  receita_obrig: boolean;
  created_at?: Date;
  updated_at?: Date;
}
