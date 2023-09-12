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
) => {
  let action = request(app.getHttpServer()).post('/directors/delete');

  if(accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`)
  }

  if(directorId !== undefined) {
    action.query({ directorId })
  }

  if(data !== undefined) {
    action.send(data);
  }

  return action;
}
