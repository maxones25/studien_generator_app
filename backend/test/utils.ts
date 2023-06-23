import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { SignupDirectorDto } from '../src/modules/auth/dtos/SignupDirectorDto';

export const createDirector = (
  app: INestApplication,
  data: SignupDirectorDto,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/auth/directors/signUp')
      .send(data)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        resolve(res.body.id as string);
      })
      .catch((err) => reject(err));
  });

export const getDirectorAccessToken = (
  app: INestApplication,
  email: string,
  password: string,
) =>
  new Promise<string>((resolve, reject) => {
    request(app.getHttpServer())
      .post('/auth/directors/login')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toBe('string');
        resolve(res.body.accessToken as string);
      })
      .catch((err) => reject(err));
  });
