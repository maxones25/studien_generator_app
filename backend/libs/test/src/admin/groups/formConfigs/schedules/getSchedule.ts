import { IApp } from '@test/app/createApp';
import { getFormsByGroup } from '../getFormsByGroup';
import { StudyRequestOptions } from '@test/types';

export interface GetScheduleRequestOptions extends StudyRequestOptions {
  groupId: any;
  configId: any;
  scheduleId: any;
}

export const getSchedule = (
  app: IApp,
  {
    accessToken,
    studyId,
    groupId,
    configId,
    scheduleId,
  }: GetScheduleRequestOptions,
) =>
  new Promise<any>((resolve, reject) => {
    getFormsByGroup(app, {
      accessToken,
      studyId,
      groupId,
    })
      .expect(200)
      .then((res) => {
        const formConfigs = res.body;

        expect(Array.isArray(formConfigs)).toBe(true);

        const formConfig = formConfigs.find((fc) => fc.id === configId);

        expect(Array.isArray(formConfig.schedules)).toBe(true);

        const schedule = formConfig.schedules.find((s) => s.id === scheduleId);

        expect(schedule).not.toBeUndefined();

        resolve(schedule);
      })
      .catch(reject);
  });
