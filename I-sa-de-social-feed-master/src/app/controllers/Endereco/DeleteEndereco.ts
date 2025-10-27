
import { Request, Response } from 'express';
import { EnderecoService } from '../../services/Endereco';

async function deleteEndereco(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const enderecoService = new EnderecoService();

    await enderecoService.deleteEndereco(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteEndereco;
