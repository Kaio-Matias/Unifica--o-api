
export interface IEndereco {
  id?: number;
  id_usuario: number;
  cep: string;
  logradouro: string;
  numero?: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  created_at?: Date;
  updated_at?: Date;
}
