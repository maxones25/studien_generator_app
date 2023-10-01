import { IApp } from '@test/app/createApp';
import { AuthRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface DeleteDirectorOptions extends AuthRequestOptions {
  directorId: string;
  data: any;
}

export const deleteDirector = (
  app: IApp,
  { accessToken, directorId, data }: DeleteDirectorOptions,
) =>
  request(app).command({
    path: '/directors/delete',
    accessToken,
    query: { directorId },
    data,
  });
