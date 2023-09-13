import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetGroupsOptions extends StudyRequestOptions {}

export const getGroups = (
  app: IApp,
  { accessToken, studyId }: GetGroupsOptions,
) =>
  request(app).query({
    path: '/groups/getByStudy',
    accessToken,
    query: { studyId },
  });
