import request from 'supertest';
import { app } from '../../src/app';

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env.development',
  });
} else {
  require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  });
}

describe('DefaultSession', () => {
  it('should answer 200 in the get request for this route', async () => {
    const response = await request(app)
      .get('/')
      .set({ Authorization: 'Bearer ' + process.env.APP_SECRET });

    expect(response.status).toBe(200);
  });
  it('should answer 401 in the get request for this route', async () => {
    const response = await request(app).get('/').set({ Authorization: '123445' });

    expect(response.status).toBe(401);
  });
});
