export interface IRespostaUsuario {
  id_resposta?: number;
  id_questao: number;
  id_usuario: number;
  resposta_fornecida: string;
  correta: boolean;
  data_resposta: Date;
  questao: {
    id_questao: number;
  };
  created_at?: Date;
  updated_at?: Date;
}
