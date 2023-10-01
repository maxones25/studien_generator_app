import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';

export const getRecords = (app: IApp) => request(app);
