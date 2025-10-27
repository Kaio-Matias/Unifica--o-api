import { Usuario } from "../entities";

export interface IConversa {
  id?: number;
  remetente_id?: number;
  destinatario_id?: number;
  destinatario?: Usuario;
  remetente?: Usuario;
  mensagem: string;
  dt_envio?: Date;
  updated_at?: Date;
}
