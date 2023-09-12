import { INestApplication } from '@nestjs/common';
import { AuthRequestOptions } from '../types';
import request from 'supertest';

export interface RestoreDirectorOptions extends AuthRequestOptions {
  directorId: string;
}

export const restoreDirector = (
  app: INestApplication,
  { accessToken, directorId }: RestoreDirectorOptions,
) => {
  let action = request(app.getHttpServer()).post('/directors/restore');

  if (accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`);
  }

  if (directorId !== undefined) {
    action.query({ directorId });
  }

  return action;
};
