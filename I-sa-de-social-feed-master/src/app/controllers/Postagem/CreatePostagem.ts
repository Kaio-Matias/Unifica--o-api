import { Request, Response } from 'express';
import { PostagemService } from '../../services/Postagem';

async function createPostagem(req: Request, res: Response) {
  try {
    const body = req.body;
    const postagemService = new PostagemService();
    
    // O service lança erro se falhar
    const postagem = await postagemService.createPostagem(body);

    return res.status(201).json({ 
      message: 'Postagem criada com sucesso',
      postagem 
    });

  } catch (err: any) {
    // Identifica se é erro de validação (Bad Request)
    if (err.message && (
        err.message.includes('Campos obrigatórios') || 
        err.message.includes('não encontrados')
    )) {
      return res.status(400).json({ message: err.message });
    }

    console.error("Erro ao criar postagem:", err);
    return res.status(500).json({ 
      message: "Erro interno ao criar postagem",
      detail: err.message 
    });
  }
}

export default createPostagem;