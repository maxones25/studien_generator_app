import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetStudiesOptions extends StudyRequestOptions {}

export const getStudyAppointments = (
  app: IApp,
  { accessToken, studyId }: GetStudiesOptions,
) =>
  request(app).query({
    path: '/studies/appointments',
    accessToken,
    query: { studyId },
  });
