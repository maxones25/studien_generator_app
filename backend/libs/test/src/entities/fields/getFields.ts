import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetFieldsOptions extends StudyRequestOptions {
  entityId: any;
}

export const getFields = (
  app: IApp,
  { accessToken, studyId, entityId }: GetFieldsOptions,
) =>
  request(app).query({
    path: '/entities/getFields',
    accessToken,
    query: { studyId, entityId },
  });
