import { RequestOptions } from '@test/types';
import { validateUUID } from '@shared/modules/uuid/uuid';
import fakeData from '@test/fakeData';
import { Director } from '@entities/core/director/Director';
import { getEnvironmentVariable } from '@test/app/getEnvironmentVariable';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export interface SignUpDirectorOptions extends RequestOptions {
  data?: any;
  withActivation?: boolean;
}

export const signUpDirector = (
  app: IApp,
  options: SignUpDirectorOptions = {},
) => {
  const { data = fakeData.director(), withActivation = true } = options;

  if (withActivation) {
    data.activationPassword = getEnvironmentVariable(
      app,
      'ACTIVATION_PASSWORD',
    );
  }

  return request(app).command({ path: '/auth/signUp', data });
};

export const createDirector = (app: IApp, data = fakeData.director()) =>
  new Promise<Director>((resolve, reject) => {
    signUpDirector(app, { data, withActivation: true })
      .expect(200)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
        resolve(Director.create({ ...data, id: res.text }));
      })
      .catch((err) => reject(err));
  });
