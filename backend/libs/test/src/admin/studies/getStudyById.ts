import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetStudyByIdOptions extends StudyRequestOptions {}

export const getStudyById = (
  app: IApp,
  { accessToken, studyId }: GetStudyByIdOptions,
) =>
  request(app).query({
    path: '/studies/getById',
    accessToken,
    query: { studyId },
  });
