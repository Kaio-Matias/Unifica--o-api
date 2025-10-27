import { IUsuariosContatos } from './usuariosContato';

export interface IUser {
  id?: number;
  nome: string;
  email: string;
  senha_hash?: string;
  tipo_usuario: string;
  telefone?: string;
  genero?: string;
  dt_nascimento?: Date;
  estado?: string;
  is_active: boolean;
  cpfcnpj?: string;
  ft_perfil?: string;
  ft_capa?: string;
  perfil_privado: boolean;
  descricao_bio?: string;
  is_verificado: boolean;
  contatos?: IUsuariosContatos[];
  created_at?: Date;
  updated_at?: Date;
}
