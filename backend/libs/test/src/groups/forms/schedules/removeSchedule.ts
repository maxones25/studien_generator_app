import { IApp } from '@test/app/createApp';
import { getFormsByGroup } from '../getFormsByGroup';
import { StudyRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface RemoveScheduleRequestOptions extends StudyRequestOptions {
  scheduleId: any;
}

export const removeSchedule = (
  app: IApp,
  { accessToken, studyId, scheduleId }: RemoveScheduleRequestOptions,
) =>
  request(app).command({
    path: '/groups/removeSchedule',
    accessToken,
    query: { studyId, scheduleId },
  });
