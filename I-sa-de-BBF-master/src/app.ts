import express from 'express';
import { useExpressApp } from './useApp';

export const app = express();

export async function server() {

  useExpressApp(app);
  app.listen(parseInt(process.env.PORT_API) || 80, () => {
    console.log('servidor rodando');
  });
}
