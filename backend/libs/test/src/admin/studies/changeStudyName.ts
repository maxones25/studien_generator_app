import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface ChangeStudyNameOptions extends StudyRequestOptions {
  data: object;
}

export const changeStudyName = (
  app: IApp,
  { accessToken, studyId, data }: ChangeStudyNameOptions,
) =>
  request(app).command({
    path: '/studies/changeName',
    accessToken,
    query: { studyId },
    data,
  });
