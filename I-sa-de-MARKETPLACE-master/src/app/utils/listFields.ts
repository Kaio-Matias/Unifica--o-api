export const CARRINHO_FIELDS = [
  'user_id',
] as const;

export const CARRINHO_ITEM_FIELDS = [
  'carrinho_id',
  'produto_id',
  'quantidade',
] as const;

export const MEDICAMENTO_FIELDS = [
  'nome',
  'principio_ativo',
  'tarja',
  'controlado',
  'receita_obrig',
] as const;

export const PAGAMENTO_FIELDS = [
  'pedido_id',
  'metodo',
  'status',
  'valor',
  'pago_em',
] as const;

export const PEDIDO_FIELDS = [
  'user_id',
  'farmacia_id',
  'valor_total',
  'status',
  'tipo_entrega',
] as const;

export const PHARMACY_FIELDS = [
  'nome',
  'cnpj',
  'endereco',
  'cidade',
  'estado',
  'latitude',
  'longitude',
] as const;

export const PHARMACY_PRODUCT_FIELDS = [
  'farmacia_id',
  'medicamento_id',
  'preco',
  'estoque',
] as const;

export const PROMOCAO_FIELDS = [
  'farmacia_id',
  'titulo',
  'descricao',
  'inicio',
  'fim',
] as const;

export const RECEITA_DIGITAL_FIELDS = [
  'user_id',
  'medico_id',
  'arquivo_url',
  'validade',
  'validada',
] as const;

export const USER_FIELDS = [
  'nome',
  'email',
  'senha_hash',
  'tipo_usuario',
  'documento',
  'telefone',
  'genero',
  'dt_nascimento',
  'estado',
  'is_active',
] as const;








