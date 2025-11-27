import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Extensão de tipos para o Express
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

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Token format invalid' });
  }

  try {
    const secret = process.env.APP_SECRET || 'sua-chave-secreta';
    const decoded = jwt.verify(token, secret) as TokenPayload;

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token Invalid or Expired', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export default auth;