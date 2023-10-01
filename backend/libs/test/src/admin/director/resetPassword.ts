import { IApp } from '@test/app/createApp';
import { AuthRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface ResetPasswordOptions extends AuthRequestOptions {
  directorId: string;
  data: any;
}

export const resetPassword = (
  app: IApp,
  { accessToken, directorId, data }: ResetPasswordOptions,
) =>
  request(app).command({
    path: '/directors/resetPassword',
    accessToken,
    query: { directorId },
    data,
  });
