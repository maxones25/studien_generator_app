import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp } from '@test/app/createApp';
import { request } from '@test/app/request';
import { StudyRequestOptions } from '@test/types';

export interface AddScheduleRequestOptions extends StudyRequestOptions {
  configId: any;
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

export const addSchedule = (
  app: IApp,
  { accessToken, studyId, configId, ...data }: AddScheduleRequestOptions,
) =>
  request(app).command({
    path: '/forms/addSchedule',
    accessToken,
    query: { studyId, configId },
    data,
  });

export const addScheduleId = (app: IApp, options: AddScheduleRequestOptions) =>
  new Promise((resolve, reject) => {
    addSchedule(app, options)
      .expect(201)
      .then((res) => {
        const id = res.text;

        expect(validateUUID(id)).toBe(true);

        resolve(id);
      })
      .catch(resolve);
  });
