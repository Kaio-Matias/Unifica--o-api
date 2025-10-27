export interface ICarrinho {
  id?: number;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ICarrinhoItem {
  id?: number;
  carrinho_id: number;
  produto_id: number;
  quantidade: number;
  created_at?: Date;
  updated_at?: Date;
}
