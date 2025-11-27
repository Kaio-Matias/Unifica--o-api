import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// --- CORREÇÃO DO TYPESCRIPT ---
// Declara que o Request do Express pode ter um campo 'user' opcional
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
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
    // Verifica o token
    const secret = process.env.APP_SECRET || 'sua-chave-secreta';
    const decoded = jwt.verify(token, secret) as TokenPayload;

    // Agora o TypeScript aceita essa atribuição sem erro
    req.user = {
      id: decoded.sub
    };

    return next();
  } catch (error) {
    return res.status(401).json({ 
      message: 'Token Invalid or Expired', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

export default auth;