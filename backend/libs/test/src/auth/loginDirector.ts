import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const loginDirector = (
  app: INestApplication,
  email: string,
  password: string,
) =>
  request(app.getHttpServer()).post('/auth/login').send({
    email,
    password,
  });

export const getDirectorAccessToken = (
  app: INestApplication,
  email: string,
  password: string,
) =>
  new Promise<string>((resolve, reject) => {
    loginDirector(app, email, password)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        resolve(res.body.accessToken as string);
      })
      .catch((err) => reject(err));
  });
