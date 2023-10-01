import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetStudyAppointmentsOptions extends StudyRequestOptions {}

export const getStudyAppointments = (
  app: IApp,
  { accessToken, studyId }: GetStudyAppointmentsOptions,
) =>
  request(app).query({
    path: '/studies/appointments',
    accessToken,
    query: { studyId },
  });
