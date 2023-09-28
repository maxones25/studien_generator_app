import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createFormId } from '@test/forms/createForm';
import { createGroupId } from '@test/groups/createGroup';
import { createGroupFormId } from '@test/groups/forms/addFormToGroup';
import {
  addSchedule,
  addScheduleId,
} from '@test/groups/forms/schedules/addSchedule';
import { getSchedule } from '@test/groups/forms/schedules/getSchedule';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('add monthly schedule', () => {
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

  beforeEach(async () => {
    formId = await createFormId(app, { accessToken, studyId });

    configId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });
  });

  afterAll(() => app.close());

  it('should add fix schedule', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    postpone = null;
    restrict = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      period,
      type,
      daysOfMonth,
      frequency,
      postpone,
      restrict,
      times,
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type,
      period,
      frequency,
      times,
      restrict,
      postpone,
      daysOfMonth,
    });
  });

  it('should add postponed schedule', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    restrict = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      period,
      type,
      daysOfMonth,
      frequency,
      postpone,
      restrict,
      times,
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type,
      period,
      frequency,
      times,
      restrict,
      postpone,
      daysOfMonth,
    });
  });

  it('should add restricted schedule', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    postpone = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      period,
      type,
      daysOfMonth,
      frequency,
      postpone,
      restrict,
      times,
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type,
      period,
      frequency,
      times,
      restrict,
      postpone,
      daysOfMonth,
    });
  });

  it('should add flexible schedule', async () => {
    let { period, type, amount, postpone, restrict, times } = fakeData.schedule(
      'Flexible',
      'Month',
    );

    postpone = null;
    restrict = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      amount,
    });

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type,
      period,
      times,
      postpone,
      restrict,
      amount,
    });
  });

  it('should fail because frequency is missing', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    frequency = undefined;

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because frequency is zero', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    frequency = 0;

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth is missing', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = undefined;

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth is wrong type', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = {} as any;

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth has length zero', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = [];

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth has wrong array type', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = ['12'];

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth has value of 0', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = [0];

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth has value of 29', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = [29];

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });

  it('should fail because daysOfMonth has no double value', async () => {
    let { period, type, daysOfMonth, frequency, postpone, restrict, times } =
      fakeData.schedule('Fix', 'Month');

    daysOfMonth = [8, 8];

    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
      times,
      postpone,
      restrict,
      frequency,
      daysOfMonth,
    }).expect(400);
  });
});
