export interface ICertificado {
  id_certificado?: number;
  id_inscricao: number;
  hash_certificado: string;
  url_certificado: string;
  emitido_em: Date;
  created_at?: Date;
  updated_at?: Date;
}
