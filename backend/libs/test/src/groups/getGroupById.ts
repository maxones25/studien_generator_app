import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetGroupByIdOptions extends StudyRequestOptions {
  groupId: string;
}

export const getGroupById = (
  app: IApp,
  { accessToken, studyId, groupId }: GetGroupByIdOptions,
) =>
  request(app).query({
    path: '/groups/getById',
    accessToken,
    query: { studyId, groupId },
  });
