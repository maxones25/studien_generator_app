import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const getMe = (app: INestApplication, accessToken: string) =>
  request(app.getHttpServer())
    .get(`/directors/me`)
    .set('Authorization', `Bearer ${accessToken}`);
