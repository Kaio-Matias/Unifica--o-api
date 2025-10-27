export const USER_FIELDS = [
  'id',
  'nome',
  'email',
  'senha_hash',
  'tipo_usuario',
  'telefone',
  'genero',
  'dt_nascimento',
  'estado',
  'is_active',
  'cpfcnpj',
  'ft_perfil',
  'ft_capa',
  'perfil_privado',
  'descricao_bio',
  'is_verificado',
  'created_at',
  'updated_at',
] as const;

export const USER_CONTACT_FIELDS = [
  'usuario_id',
  'contato_id',
] as const;

export const CONTACT_FIELDS = [
  'tipo_contato',
  'valor',
  'is_principal',
  'id_usuario'
] as const;








