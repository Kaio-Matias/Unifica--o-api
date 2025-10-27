
import { Request, Response } from 'express';
import { InscricaoTrilhaService } from '../../services/InscricaoTrilha';

async function deleteInscricaoTrilha(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const inscricaoTrilhaService = new InscricaoTrilhaService();

    await inscricaoTrilhaService.deleteInscricaoTrilha(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteInscricaoTrilha;
