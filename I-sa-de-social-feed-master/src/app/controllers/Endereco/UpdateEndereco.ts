
import { Request, Response } from 'express';
import { EnderecoService } from '../../services/Endereco';

async function updateEndereco(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const enderecoService = new EnderecoService();

    const result = await enderecoService.updateEndereco(parseInt(id), body);

    return res.status(200).json({ result, message: 'Endereço atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateEndereco;
