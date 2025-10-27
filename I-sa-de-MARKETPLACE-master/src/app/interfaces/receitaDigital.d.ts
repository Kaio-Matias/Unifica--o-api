export interface IReceitaDigital {
  id?: number;
  user_id: number;
  medico_id: number;
  arquivo_url: string;
  validade: Date;
  validada: boolean;
  created_at?: Date;
  updated_at?: Date;
}
