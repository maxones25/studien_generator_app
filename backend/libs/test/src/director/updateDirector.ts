import { INestApplication } from '@nestjs/common';
import { AuthRequestOptions } from '../types';
import request from 'supertest';

export interface UpdateDirectorOptions extends AuthRequestOptions {
  directorId: string;
  data: any;
}

export const updateDirector = (
  app: INestApplication,
  { accessToken, directorId, data }: UpdateDirectorOptions,
) => {
  let action = request(app.getHttpServer()).post('/directors/update');

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
