import { INestApplication } from '@nestjs/common';
import { AuthRequestOptions } from '../types';
import request from 'supertest';

export interface DeleteDirectorOptions extends AuthRequestOptions {
  directorId: string;
  data: any;
}

export const deleteDirector = (
  app: INestApplication,
  { accessToken, directorId, data }: DeleteDirectorOptions,
) =>
  request(app.getHttpServer())
    .post('/directors/delete')
    .set('Authorization', `Bearer ${accessToken}`)
    .query({ directorId })
    .send(data);
