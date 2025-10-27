
import { Request, Response } from 'express';
import { InscricaoTrilhaService } from '../../services/InscricaoTrilha';

async function createInscricaoTrilha(req: Request, res: Response) {
  try {
    const body = req.body;
    const inscricaoTrilhaService = new InscricaoTrilhaService();
    const inscricao = await inscricaoTrilhaService.createInscricaoTrilha(body);

    return res.status(201).json({ inscricao, message: 'Inscrição em trilha criada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createInscricaoTrilha;
