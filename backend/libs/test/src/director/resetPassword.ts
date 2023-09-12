import { INestApplication } from '@nestjs/common';
import { AuthRequestOptions } from '../types';
import request from 'supertest';

export interface ResetPasswordOptions extends AuthRequestOptions {
  directorId: string;
  data: any;
}

export const resetPassword = (
  app: INestApplication,
  { accessToken, directorId, data }: ResetPasswordOptions,
) => {
  let action = request(app.getHttpServer()).post('/directors/resetPassword');

  if (accessToken !== undefined) {
    action.set('Authorization', `Bearer ${accessToken}`);
  }

  if (directorId !== undefined) {
    action.query({ directorId });
  }

  if (data !== undefined) {
    action.send(data);
  }

  return action;
};
