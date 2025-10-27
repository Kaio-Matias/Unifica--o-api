// Comentario Interface
export interface IComentario {
  id?: number;
  id_postagem: number;
  autor_id: number;
  texto: string;
  id_pai?: number;
  created_at?: Date;
  updated_at?: Date;
}
