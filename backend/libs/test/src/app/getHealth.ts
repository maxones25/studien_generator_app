import { IApp } from './createApp';
import { request } from './request';

export const getHealth = (app: IApp) =>
  request(app).query({ path: `/health` });
