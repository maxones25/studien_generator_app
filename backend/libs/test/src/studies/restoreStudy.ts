import { IApp } from '@test/app/createApp';
import { StudyRequestOptions } from '../types';
import { request } from '@test/app/request';

export interface RestoreStudyOptions extends StudyRequestOptions {}

export const restoreStudy = (
  app: IApp,
  { accessToken, studyId }: RestoreStudyOptions,
) =>
  request(app).command({
    path: '/studies/restore',
    accessToken,
    query: { studyId },
  });
