import express from 'express';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';
import { redisClient } from './app/Redis/clientRedis';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export const app = express();

export async function server() {

  useExpressApp(app);
  await redisClient.connect();
  dataSource
    .initialize()
    .then(() => {
      app.listen(parseInt(process.env.PORT_API) || 80, () => {
        console.log('servidor rodando');
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
