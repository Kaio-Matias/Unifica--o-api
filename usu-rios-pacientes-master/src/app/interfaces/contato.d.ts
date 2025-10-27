import { User } from "@models/Users";

export interface IContato {
  id?: number;
  tipo_contato: number;
  valor: string;
  is_principal: boolean;
  dt_criacao?: Date;
  id_usuario: number;
  dt_inativacao?: Date;
  updated_at?: Date;
  usuario?: User
}
