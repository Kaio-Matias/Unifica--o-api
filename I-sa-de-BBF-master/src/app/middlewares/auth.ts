import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Garante que as variáveis de ambiente estejam carregadas
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
  // Adicione outros campos que seu token possa ter
}

async function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  // O formato esperado é "Bearer <token>"
  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token format invalid' });
  }

  try {
    // Verifica se a chave secreta está definida
    if (!process.env.APP_SECRET) {
      throw new Error('APP_SECRET not configured in environment variables');
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.APP_SECRET) as TokenPayload;

    // Opcional: Se você quiser passar o ID do usuário para os controllers
    // req.userId = decoded.id; 

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token Invalid or Expired', error: error instanceof Error ? error.message : error });
  }
}

export default auth;