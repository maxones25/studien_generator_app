import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createGroupId,
  createGroupFormId,
  addScheduleId,
  removeSchedule,
  getFormsByGroup,
} from '@test/admin/groups';
import { createStudyId, addMember } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('remove schedule', () => {
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

  it('should remove schedule', async () => {
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

    await removeSchedule(app, {
      accessToken,
      studyId,
      scheduleId,
    }).expect(200);

    await getFormsByGroup(app, {
      accessToken,
      studyId,
      groupId,
    })
      .expect(200)
      .then((res) => {
        const formConfigs = res.body;

        expect(Array.isArray(formConfigs)).toBe(true);
        expect(formConfigs.length).toBe(1);

        expect(Array.isArray(formConfigs[0].schedules)).toBe(true);
        expect(formConfigs[0].schedules.length).toBe(0);
      });
  });

  it('should fail because unauthorized', async () => {
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

    return await removeSchedule(app, {
      accessToken: undefined,
      studyId,
      scheduleId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
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

    const adminAccessToken = await getAdminAccessToken(app);

    return await removeSchedule(app, {
      accessToken: adminAccessToken,
      studyId,
      scheduleId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
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

    return await removeSchedule(app, {
      accessToken: otherAccessToken,
      studyId,
      scheduleId,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
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

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    }).expect(201);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return await removeSchedule(app, {
      accessToken: otherAccessToken,
      studyId,
      scheduleId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
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

    return await removeSchedule(app, {
      accessToken,
      studyId: undefined,
      scheduleId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
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

    return await removeSchedule(app, {
      accessToken,
      studyId: fakeData.text(),
      scheduleId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
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

    return await removeSchedule(app, {
      accessToken,
      studyId: fakeData.id(),
      scheduleId,
    }).expect(401);
  });

  it('should fail because scheduleId is missing', async () => {
    const createData = fakeData.schedule('Fix', 'Day');

    await addScheduleId(app, {
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

    return await removeSchedule(app, {
      accessToken,
      studyId,
      scheduleId: undefined,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const createData = fakeData.schedule('Fix', 'Day');

    await addScheduleId(app, {
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

    return await removeSchedule(app, {
      accessToken,
      studyId,
      scheduleId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const createData = fakeData.schedule('Fix', 'Day');

    await addScheduleId(app, {
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

    return await removeSchedule(app, {
      accessToken,
      studyId,
      scheduleId: fakeData.id(),
    }).expect(401);
  });
});
