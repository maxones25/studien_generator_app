import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetMembersOptions extends StudyRequestOptions {}

export const getMembers = (
  app: IApp,
  { accessToken, studyId }: GetMembersOptions,
) =>
  request(app).query({
    path: `/members/getByStudy`,
    accessToken,
    query: { studyId },
  });
