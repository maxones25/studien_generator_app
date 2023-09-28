import { AppModule } from '@admin/app.module';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
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
import { updateSchedule } from '@test/groups/forms/schedules/updateSchedule';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('update schedule', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
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

    otherAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
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

  it('should update daily to weekly schedule', async () => {
    const createData = fakeData.schedule('Fix', 'Day');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      frequency: createData.frequency,
    });

    const updateData = fakeData.schedule('Fix', 'Week');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfWeek: updateData.daysOfWeek,
    }).expect(200);

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfWeek: updateData.daysOfWeek,
    });
  });

  it('should update weekly to monthly schedule', async () => {
    const createData = fakeData.schedule('Fix', 'Week');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      frequency: createData.frequency,
      daysOfWeek: createData.daysOfWeek,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(200);

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    });
  });

  it('should update monthly to daily schedule', async () => {
    const createData = fakeData.schedule('Fix', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      frequency: createData.frequency,
      daysOfMonth: createData.daysOfMonth,
    });

    const updateData = fakeData.schedule('Fix', 'Day');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
    }).expect(200);

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
    });
  });

  it('should update fix to flexible schedule', async () => {
    const createData = fakeData.schedule('Fix', 'Week');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      frequency: createData.frequency,
      daysOfWeek: createData.daysOfWeek,
    });

    const updateData = fakeData.schedule('Flexible', 'Week');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      amount: updateData.amount,
    }).expect(200);

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      amount: updateData.amount,
    });
  });

  it('should update flexible to fix schedule', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(200);

    const schedule = await getSchedule(app, {
      accessToken,
      studyId,
      groupId,
      configId,
      scheduleId,
    });

    expect(schedule).toEqual({
      id: scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    });
  });

  it('should fail because flexible daily not valid', async () => {
    const createData = fakeData.schedule('Fix', 'Day');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      frequency: createData.frequency,
    });

    const updateData = fakeData.schedule('Flexible', 'Day');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      amount: updateData.amount,
    }).expect(400);
  });

  it('should fail because unauthorized', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken: undefined,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    const adminAccessToken = await getAdminAccessToken(app);

    await updateSchedule(app, {
      accessToken: adminAccessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken: otherAccessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId: undefined,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId: fakeData.text(),
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId: fakeData.id(),
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because scheduleId is missing', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId: undefined,
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });

  it('should fail because scheduleId is invalid', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId: fakeData.text(),
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because scheduleId is unknown', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId: fakeData.id(),
      type: updateData.type,
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(401);
  });

  it('should fail because type is invalid', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: 'Fix1',
      period: updateData.period,
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });

  it('should fail because period is invalid', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: 'Month1',
      times: updateData.times,
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });

  it('should fail because times is invalid', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: {},
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });

  it('should fail because times is empty', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: [],
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });

  it('should fail because times has invalid time', async () => {
    const createData = fakeData.schedule('Flexible', 'Month');

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type: createData.type,
      period: createData.period,
      times: createData.times,
      postpone: createData.postpone,
      restrict: createData.restrict,
      amount: createData.amount,
    });

    const updateData = fakeData.schedule('Fix', 'Month');

    await updateSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
      type: updateData.type,
      period: updateData.period,
      times: ['44:99'],
      postpone: updateData.postpone,
      restrict: updateData.restrict,
      frequency: updateData.frequency,
      daysOfMonth: updateData.daysOfMonth,
    }).expect(400);
  });
});
