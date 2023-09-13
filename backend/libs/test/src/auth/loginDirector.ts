import { INestApplication } from '@nestjs/common';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export const loginDirector = (app: IApp, email: string, password: string) =>
  request(app).command({ path: '/auth/login', data: { email, password } });

export const getDirectorAccessToken = (
  app: IApp,
  email: string,
  password: string,
) =>
  new Promise<string>((resolve, reject) => {
    loginDirector(app, email, password)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.accessToken).toEqual('string');
        resolve(res.body.accessToken as string);
      })
      .catch((err) => reject(err));
  });
