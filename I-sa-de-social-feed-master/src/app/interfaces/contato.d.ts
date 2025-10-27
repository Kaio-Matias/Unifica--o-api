
export interface IContato {
  id?: number;
  tipo_contato: number;
  valor: string;
  is_principal: boolean;
  dt_criacao: Date;
  dt_inativacao?: Date;
  updated_at?: Date;
}
