// Seguidor Interface
export interface ISeguidor {
  id_seguidor?: number;
  seguidor_id: number;
  seguindo_id: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
