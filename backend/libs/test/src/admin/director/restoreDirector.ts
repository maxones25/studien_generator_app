import { request } from '@test/app/request';
import { AuthRequestOptions } from '@test/types';
import { IApp } from '@test/app/createApp';

export interface RestoreDirectorOptions extends AuthRequestOptions {
  directorId: string;
}

export const restoreDirector = (
  app: IApp,
  { accessToken, directorId }: RestoreDirectorOptions,
) =>
  request(app).command({
    path: '/directors/restore',
    accessToken,
    query: { directorId },
  });
