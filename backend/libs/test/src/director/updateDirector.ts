import { IApp } from '@test/app/createApp';
import { AuthRequestOptions } from '../types';
import { request } from '@test/app/request';

export interface UpdateDirectorOptions extends AuthRequestOptions {
  directorId: string;
  data: any;
}

export const updateDirector = (
  app: IApp,
  { accessToken, directorId, data }: UpdateDirectorOptions,
) =>
  request(app).command({
    path: '/directors/update',
    accessToken,
    query: { directorId },
    data,
  });
