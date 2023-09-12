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
