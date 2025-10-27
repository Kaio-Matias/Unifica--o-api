
export interface IPagamento {
  id?: number;
  pedido_id: number;
  metodo: string;
  status: string;
  valor: number;
  pago_em?: Date;
  created_at?: Date;
  updated_at?: Date;
}
