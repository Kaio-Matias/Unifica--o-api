
export interface INotificacao {
  id_notificacao: number;
  id_usuario: number;
  tipo_notificacao: string;
  origem_tipo?: string;
  origem_id?: number;
  lida: boolean;
  created_at?: Date;
  updated_at?: Date;
}
