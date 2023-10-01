import { IApp } from '@test/app/createApp';
import { getFormsByGroup } from '../getFormsByGroup';
import { StudyRequestOptions } from '@test/types';
import { request } from '@test/app/request';

export interface UpdateScheduleRequestOptions extends StudyRequestOptions {
  scheduleId: any;
  type: any;
  period: any;
  postpone: any;
  restrict: any;
  times: any;
  frequency?: any;
  daysOfWeek?: any;
  daysOfMonth?: any;
  amount?: any;
}

export const updateSchedule = (
  app: IApp,
  {
    accessToken,
    studyId,
    scheduleId,
    type,
    period,
    times,
    postpone,
    restrict,
    amount,
    daysOfMonth,
    daysOfWeek,
    frequency,
  }: UpdateScheduleRequestOptions,
) =>
  request(app).command({
    path: '/groups/updateSchedule',
    accessToken,
    query: { studyId, scheduleId },
    data: {
      type,
      period,
      times,
      postpone,
      restrict,
      amount,
      daysOfMonth,
      daysOfWeek,
      frequency,
    },
  });
