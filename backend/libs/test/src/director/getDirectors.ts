import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export const getDirectors = (app: IApp, accessToken: any) =>
  request(app).query({ path: `/directors/getAll`, accessToken });
