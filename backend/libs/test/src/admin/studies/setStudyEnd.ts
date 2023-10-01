import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface SetStudyEndOptions extends StudyRequestOptions {
  endDate: any;
}

export const setStudyEnd = (
  app: IApp,
  { accessToken, studyId, endDate }: SetStudyEndOptions,
) =>
  request(app).command({
    path: '/studies/setEndDate',
    accessToken,
    query: { studyId },
    data: { date: endDate },
  });
