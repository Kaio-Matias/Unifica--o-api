// UnidadeSaude Interface
export interface IUnidadeSaude {
  cnpj: string;
  nm_fantasia: string;
  tipo_unidade: string;
  resp_legal: string;
  cpf_resp: string;
  registroResp: string;
  endereco_id: number;
  created_at?: Date;
  updated_at?: Date;
}
