import { IApp } from '@test/app/createApp';
import { getEnvironmentVariable } from '@test/app/getEnvironmentVariable';
import { request } from '@test/app/request';

export interface LoginAdminOptions {
  activationPassword?: string;
  withPassword?: boolean;
}

export const loginAdmin = (
  app: IApp,
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
  return request(app).command({ path: `/auth/loginAdmin`, data })
};

export const getAdminAccessToken = (app: IApp) =>
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
