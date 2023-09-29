import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFormsByEntityRequestOptions extends StudyRequestOptions {
  entityId: any;
}

export const getFormsByEntity = (
  app: IApp,
  { accessToken, studyId, entityId }: GetFormsByEntityRequestOptions,
) =>
  request(app).query({ path: '/forms/getByEntity', accessToken, query: { studyId, entityId } });
