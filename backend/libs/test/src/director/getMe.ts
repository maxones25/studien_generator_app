import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export const getMe = (app: IApp, accessToken: any) =>
  request(app).query({ path: `/directors/me`, accessToken });

export const getDirectorById = (app: IApp, accessToken: string) =>
  new Promise<any>((resolve, reject) => {
    getMe(app, accessToken)
      .expect(200)
      .then((res) => {
        const director = res.body;
        expect(validateUUID(director.id)).toBeTruthy();
        resolve(director);
      })
      .catch(reject);
  });
