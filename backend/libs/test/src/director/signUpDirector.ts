import { INestApplication } from '@nestjs/common';
import { RequestOptions } from '../types';
import request from 'supertest';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { getEnv } from '@test/utils';
import fakeData from '@test/fakeData';
import { Director } from '@entities/core/director/Director';

export interface SignUpDirectorOptions extends RequestOptions {
  data?: any;
  withActivation?: boolean;
}

export const signUpDirector = (
  app: INestApplication,
  options: SignUpDirectorOptions = {},
) => {
  const { data = fakeData.director(), withActivation = true } = options;

  if (withActivation) {
    data.activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');
  }

  return request(app.getHttpServer()).post('/auth/signUp').send(data);
};

export const createDirector = (app: INestApplication, data = fakeData.director()) =>
  new Promise<Director>((resolve, reject) => {
    signUpDirector(app, { data, withActivation: true })
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(Director.create({ ...data, id: res.text }));
      })
      .catch((err) => reject(err));
  });
