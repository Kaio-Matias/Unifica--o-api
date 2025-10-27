export interface IInscricaoTrilha {
  id_inscricao?: number;
  id_usuario: number;
  id_trilha: number;
  status: string;
  data_inscricao?: Date;
  data_conclusao?: Date | null;
  certificado_gerado: boolean;
  updated_at?: Date;
}
