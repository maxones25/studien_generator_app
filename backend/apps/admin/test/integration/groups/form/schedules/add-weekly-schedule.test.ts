import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createFormId } from '@test/forms/createForm';
import { createGroupId } from '@test/groups/createGroup';
import { createGroupFormId } from '@test/groups/forms/addFormToGroup';
import { getFormsByGroup } from '@test/groups/forms/getFormsByGroup';
import {
  addSchedule,
  addScheduleId,
} from '@test/groups/forms/schedules/addSchedule';
import { getSchedule } from '@test/groups/forms/schedules/getSchedule';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('add weekly schedule', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let groupId: string;
  let formId: string;
  let configId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken });

    groupId = await createGroupId(app, { accessToken, studyId });
  });

  afterAll(() => app.close());

  beforeEach(async () => {
    formId = await createFormId(app, { accessToken, studyId });

    configId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });
  });

  it('should add fix weekly schedule', async () => {
    const times = [fakeData.time(), fakeData.time()];

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: 2,
      daysOfWeek: [true, false, true, false, true, false, false],
      postpone: null,
      restrict: null,
      times,
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule.id).toBe(scheduleId);
    expect(schedule.type).toBe('Fix');
    expect(schedule.period).toBe('Week');
    expect(schedule.frequency).toBe(2);
    expect(schedule.restrict).toBe(null);
    expect(schedule.postpone).toBe(null);
    expect(schedule.daysOfWeek.length).toBe(7);

    schedule.daysOfWeek.forEach((day) => {
      expect(typeof day).toBe('boolean');
    });

    expect(schedule.times.length).toBe(times.length);

    schedule.times.forEach((time, i) => {
      expect(time).toBe(times[i]);
    });
  });

  it('should add flexible weekly schedule', async () => {
    const times = [fakeData.time(), fakeData.time()];

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: 'Flexible',
      period: 'Week',
      amount: 3,
      postpone: null,
      restrict: null,
      times,
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule.id).toBe(scheduleId);
    expect(schedule.type).toBe('Flexible');
    expect(schedule.period).toBe('Week');
    expect(schedule.amount).toBe(3);
    expect(schedule.frequency).toBeUndefined();
    expect(schedule.restrict).toBe(null);
    expect(schedule.postpone).toBe(null);
    expect(schedule.daysOfWeek).toBeUndefined();

    expect(schedule.times.length).toBe(times.length);

    schedule.times.forEach((time, i) => {
      expect(time).toBe(times[i]);
    });
  });

  it('should add postponable schedule', async () => {
    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [true, false, true, false, true, false, false],
      postpone: {
        times: 2,
        duration: 1,
      },
      restrict: null,
      times: [fakeData.time()],
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule.id).toBe(scheduleId);
    expect(schedule.postpone.times).toBe(2);
    expect(schedule.postpone.duration).toBe(1);
  });

  it('should add restricted schedule', async () => {
    const restrict = {
      after: fakeData.positiveInteger(),
      before: fakeData.positiveInteger(),
    };

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [true, false, true, false, true, false, false],
      postpone: null,
      restrict,
      times: [fakeData.time()],
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule.id).toBe(scheduleId);
    expect(schedule.restrict.after).toBe(restrict.after);
    expect(schedule.restrict.before).toBe(restrict.before);
  });

  it('should fail because type invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix1',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [true, false, true, false, true, false, false],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because period invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week3',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [true, false, true, false, true, false, false],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because frequency is zero', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: 0,
      daysOfWeek: [true, false, true, false, true, false, false],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because daysOfWeek missing', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: undefined,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because daysOfWeek is wrong type', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: {},
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because daysOfWeek has length of 0', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because daysOfWeek has length of 6', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because daysOfWeek has length of 8', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because daysOfWeek has not a boolean array', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Week',
      frequency: fakeData.positiveInteger(),
      daysOfWeek: [true, false, true, 'false', true, false, false],
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });
});
