import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface SetStudyStartOptions extends StudyRequestOptions {
  startDate: any;
}

export const setStudyStart = (
  app: IApp,
  { accessToken, studyId, startDate }: SetStudyStartOptions,
) =>
  request(app).command({
    path: '/studies/setStartDate',
    accessToken,
    query: { studyId },
    data: { date: startDate },
  });
