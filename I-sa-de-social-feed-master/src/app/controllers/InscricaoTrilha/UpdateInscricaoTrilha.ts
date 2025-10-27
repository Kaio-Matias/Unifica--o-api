
import { Request, Response } from 'express';
import { InscricaoTrilhaService } from '../../services/InscricaoTrilha';

async function updateInscricaoTrilha(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const inscricaoTrilhaService = new InscricaoTrilhaService();

    const result = await inscricaoTrilhaService.updateInscricaoTrilha(parseInt(id), body);

    return res.status(200).json({ result, message: 'Inscrição em trilha atualizada com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateInscricaoTrilha;
