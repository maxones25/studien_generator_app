import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface SetStudyDurationOptions extends StudyRequestOptions {
  duration: any;
}

export const setStudyDuration = (
  app: IApp,
  { accessToken, studyId, duration }: SetStudyDurationOptions,
) =>
  request(app).command({
    path: '/studies/setDuration',
    accessToken,
    query: { studyId },
    data: { duration },
  });
