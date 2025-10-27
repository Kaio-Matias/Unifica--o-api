
import { Request, Response } from 'express';
import { EnderecoService } from '../../services/Endereco';

async function createEndereco(req: Request, res: Response) {
  try {
    const body = req.body;
    const enderecoService = new EnderecoService();
    const endereco = await enderecoService.createEndereco(body);

    return res.status(201).json({ endereco, message: 'Endereço criado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createEndereco;
