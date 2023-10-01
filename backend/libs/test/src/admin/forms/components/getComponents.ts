import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export const getComponents = (app: IApp, accessToken: any) =>
  request(app).query({ path: `/components`, accessToken });