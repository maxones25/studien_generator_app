import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface SetStudyActivationOptions extends StudyRequestOptions {
  isActive: any;
}

export const setStudyActivation = (
  app: IApp,
  { accessToken, studyId, isActive }: SetStudyActivationOptions,
) =>
  request(app).command({
    path: '/studies/setActivation',
    accessToken,
    query: { studyId },
    data: { isActive },
  });
