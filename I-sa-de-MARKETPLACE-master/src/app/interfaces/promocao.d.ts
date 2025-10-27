export interface IPromocao {
  id?: number;
  farmacia_id: number;
  titulo: string;
  descricao?: string;
  inicio: Date;
  fim: Date;
  created_at?: Date;
  updated_at?: Date;
}
