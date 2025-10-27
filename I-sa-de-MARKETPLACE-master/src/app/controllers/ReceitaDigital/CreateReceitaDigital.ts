
import { Request, Response } from 'express';
import { ReceitaDigitalService } from "../../services/ReceitaDigital";

async function createReceitaDigital(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ReceitaDigitalService();

    const results = await getService.createReceitaDigital(body)

    return res.status(201).json({ results, message: "Receita Digital criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createReceitaDigital;
