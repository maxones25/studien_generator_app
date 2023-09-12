import { INestApplication } from '@nestjs/common';
import { getEnvironmentVariable } from '@test/app/getEnvironmentVariable';
import request from 'supertest';

export interface LoginAdminOptions {
  activationPassword?: string;
  withPassword?: boolean;
}

export const loginAdmin = (
  app: INestApplication,
  { activationPassword, withPassword = false }: LoginAdminOptions,
) => {
  const data: any = {};

  if (withPassword) {
    data.activationPassword = getEnvironmentVariable(
      app,
      'ACTIVATION_PASSWORD',
    );
  } else if (activationPassword !== undefined) {
    data.activationPassword = activationPassword;
  }

  return request(app.getHttpServer()).post(`/auth/loginAdmin`).send(data);
};

export const getAdminAccessToken = (app: INestApplication) =>
  new Promise<string>((resolve, reject) => {
    loginAdmin(app, { withPassword: true })
      .expect(200)
      .then((res) => {
        const accessToken = res.text;
        expect(typeof accessToken).toBe('string');
        resolve(accessToken as string);
      })
      .catch(reject);
  });
