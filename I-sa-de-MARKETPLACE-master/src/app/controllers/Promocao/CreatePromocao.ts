
import { Request, Response } from 'express';
import { PromocaoService} from "../../services/Promocao";

async function createPromocao(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new PromocaoService();

    const results = await getService.createPromocao(body)

    return res.status(201).json({ results, message: "Promoção criada com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createPromocao;
