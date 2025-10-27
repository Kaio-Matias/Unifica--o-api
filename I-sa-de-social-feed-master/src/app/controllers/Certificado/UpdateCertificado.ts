
import { Request, Response } from 'express';
import { CertificadoService } from '../../services/Certificado';

async function updateCertificado(req: Request, res: Response) {
  try {
    const body = req.body;
    const { id } = req.params;
    const certificadoService = new CertificadoService();

    const result = await certificadoService.updateCertificado(parseInt(id), body);

    return res.status(200).json({ result, message: 'Certificado atualizado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default updateCertificado;
