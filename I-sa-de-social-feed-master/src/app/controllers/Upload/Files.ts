
import { Request, Response } from 'express';
import { uploadFile } from 'src/app/services/CloudStorage';


export interface MulterRequest extends Request {
  file: any;
}

export async function uploadFiles(req: MulterRequest, res: Response) {
  if (!req.file) return res.status(400).json({ message: 'Nenhum arquivo enviado' });
  try {
    const file = req.file;

    if (!file) return res.status(400).send('Arquivo não enviado');

    const publicUrl = await uploadFile(file.path, file.originalname, file.mimetype);

    res.json({ url: publicUrl });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
