import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetGroupsOptions extends StudyRequestOptions {
  deleted?: any;
}

export const getGroups = (
  app: IApp,
  { accessToken, studyId, deleted = false }: GetGroupsOptions,
) =>
  request(app).query({
    path: '/groups/getByStudy',
    accessToken,
    query: { studyId, deleted },
  });
