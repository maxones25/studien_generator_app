import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export const getDirectors = (app: INestApplication, accessToken: any) =>
  request(app.getHttpServer())
    .get(`/directors/getAll`)
    .set('Authorization', `Bearer ${accessToken}`);
