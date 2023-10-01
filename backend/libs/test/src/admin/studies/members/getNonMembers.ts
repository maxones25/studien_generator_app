import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetNonMembersOptions extends StudyRequestOptions {}

export const getNonMembers = (
  app: IApp,
  { accessToken, studyId }: GetNonMembersOptions,
) =>
  request(app).query({
    path: `/studies/getNonStudyMembers`,
    accessToken,
    query: { studyId },
  });
