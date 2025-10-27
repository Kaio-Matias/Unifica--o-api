
import { Request, Response } from 'express';
import { CertificadoService } from '../../services/Certificado';

async function deleteCertificado(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const certificadoService = new CertificadoService();

    await certificadoService.deleteCertificado(parseInt(id));

    return res.status(204).json();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default deleteCertificado;
