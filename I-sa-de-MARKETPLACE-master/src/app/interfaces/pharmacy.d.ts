export interface IPharmacy {
  id?: number;
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IPharmacyProduct {
  id?: number;
  farmacia_id: number;
  medicamento_id: number;
  preco: number;
  estoque: number;
  created_at?: Date;
  updated_at?: Date;
}
