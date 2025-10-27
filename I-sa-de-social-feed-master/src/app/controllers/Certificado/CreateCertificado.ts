
import { Request, Response } from 'express';
import { CertificadoService } from '../../services/Certificado';

async function createCertificado(req: Request, res: Response) {
  try {
    const body = req.body;
    const certificadoService = new CertificadoService();
    const certificado = await certificadoService.createCertificado(body);

    return res.status(201).json({ certificado, message: 'Certificado criado com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
export default createCertificado;
