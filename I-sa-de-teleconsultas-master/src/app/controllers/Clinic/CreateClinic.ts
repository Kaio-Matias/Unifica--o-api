import { Request, Response } from 'express';
import { ClinicService } from "../../services/Clinic";

async function createClinic(req: Request, res: Response) {
  try {
    const body = req.body;
    const service = new ClinicService();

    // O service lança erro se falhar, então se passar daqui é sucesso
    const result = await service.createClinic(body);

    return res.status(201).json({ 
      message: "Clínica criada com sucesso",
      clinic: result 
    });

  } catch (err: any) {
    // Tratamento diferenciado para erros conhecidos
    if (err.message === 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: err.message });
    }

    console.error("Erro ao criar clínica:", err);
    return res.status(500).json({ 
      message: "Erro interno ao processar criação da clínica",
      detail: err.message 
    });
  }
}

export default createClinic;