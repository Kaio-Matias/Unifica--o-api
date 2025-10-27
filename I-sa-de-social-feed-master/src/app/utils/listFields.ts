// src/utils/listFields.ts (continuação)

export const AULA_FIELDS = [
  'id_modulo',
  'titulo',
  'tipo',
  'url_conteudo',
  'duracao_min',
] as const;

export const CATEGORIA_POSTAGEM_FIELDS = [
  'nome',
  'descricao',
] as const;

export const CERTIFICADO_FIELDS = [
  'id_inscricao',
  'hash_certificado',
  'url_certificado',
  'emitido_em',
] as const;

export const COMENTARIO_FIELDS = [
  'id_postagem',
  'autor_id',
  'texto',
  'id_pai', // Pode ser nulo, mas é um campo direto na entidade
] as const;

export const CONVERSA_FIELDS = [
  'remetente_id',
  'destinatario_id',
  'mensagem',
] as const;

export const CURTIDA_FIELDS = [
  'postagem_id',
  'autor_id',
] as const;

export const ENDERECO_FIELDS = [
  'id_usuario',
  'cep',
  'logradouro',
  'numero',
  'complemento',
  'bairro',
  'cidade',
  'estado',
  'pais',
] as const;

export const FARMACIA_FIELDS = [
  'cnpj',
  'razao_social',
  'nm_fantasia',
  'resp_tecnico',
  'cpf_resp',
  'registro_resp',
  'endereco_id',
] as const;

export const INSCRICAO_TRILHA_FIELDS = [
  'id_usuario',
  'id_trilha',
  'status',
  'data_conclusao',
  'certificado_gerado',
] as const;

export const LOCALIZACAO_FIELDS = [
  'id_usuario',
  'latitude',
  'longitude',
] as const;

export const MODULO_TRILHA_FIELDS = [
  'id_trilha',
  'titulo',
  'descricao',
  'ordem',
  'duracao_estimada_min',
] as const;

export const NOTIFICACAO_FIELDS = [
  'id_usuario',
  'tipo_notificacao',
  'origem_tipo',
  'origem_id',
  'lida',
] as const;

export const POSTAGEM_FIELDS = [
  'conteudo',
  'autor_id',
  'tipo_conteudo',
  'duracao_segundos',
  'idioma',
  'id_localizacao',
  'hashtags',
  'visualizacoes',
  'curtidas',
  'compartilhamentos',
  'comentarios_qtd',
  'tempo_medio_visualiz',
  'engajamento_score',
] as const;

export const PROFISSIONAL_DETALHES_FIELDS = [
  'area_atuacao',
  'id_user',
  'registro_prof',
  'especialidade',
  'est_atuacao',
] as const;

export const PROGRESSO_AULA_FIELDS = [
  'id_inscricao',
  'id_aula',
  'status',
  'tempo_assistido_min',
  'ultima_visualizacao',
  'concluido_em',
] as const;

export const QUESTAO_QUIZ_FIELDS = [
  'id_quiz',
  'texto_questao',
  'tipo',
  'resposta_correta',
] as const;

export const QUIZ_FIELDS = [
  'id_aula',
  'titulo',
  'descricao',
] as const;

export const RESPOSTA_USUARIO_FIELDS = [
  'id_questao',
  'id_usuario',
  'resposta_fornecida',
  'correta',
  'data_resposta',
] as const;

export const SALVAMENTO_FIELDS = [
  'id_usuario',
  'tipo_conteudo',
  'id_conteudo',
] as const;

export const SEGUIDOR_FIELDS = [
  'seguidor_id',
  'seguindo_id',
  'status',
] as const;

export const TRILHA_FIELDS = [
  'titulo',
  'descricao',
  'area_atuacao',
  'duracao_estimada_horas',
] as const;

export const UNIDADE_SAUDE_FIELDS = [
  'cnpj',
  'nm_fantasia',
  'tipo_unidade',
  'resp_legal',
  'cpf_resp',
  'registroResp',
  'endereco_id',
] as const;

export const STORY_FIELDS = [
  'autor_id',
  'conteudo',
  'tipo_conteudo',
  'duracao_segundos',
  'dt_publicacao',
  'visualizacoes',
  'curtidas',
  'compartilhamentos',
  'expirado',
  'ativo',
  'hashtags',
  'idioma',
  'id_localizacao',
  'tempo_medio_visualiz',
  'engajamento_score',
] as const;

