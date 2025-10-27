
export interface IPedido {
  id?: number;
  user_id: number;
  farmacia_id: number;
  valor_total: number;
  status: string;
  tipo_entrega: string;
  created_at?: Date;
  updated_at?: Date;
}
