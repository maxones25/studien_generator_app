import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface GetGroupAppointmentsOptions extends StudyRequestOptions {
  groupId: any;
}

export const getGroupAppointments = (
  app: IApp,
  { accessToken, studyId, groupId }: GetGroupAppointmentsOptions,
) =>
  request(app).query({
    path: '/groups/appointments',
    accessToken,
    query: { studyId, groupId },
  });
