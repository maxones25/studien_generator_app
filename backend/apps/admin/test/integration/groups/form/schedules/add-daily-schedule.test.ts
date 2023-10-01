import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createGroupId,
  createGroupFormId,
  addScheduleId,
  getSchedule,
  addSchedule,
} from '@test/admin/groups';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('add daily schedule', () => {
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

  it('should add fix daily schedule', async () => {
    let { type, period, postpone, restrict, frequency, times } =
      fakeData.schedule('Fix', 'Day');

    postpone = null;
    restrict = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
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
      times,
      postpone,
      restrict,
      frequency,
    });
  });

  it('should add postponable schedule', async () => {
    let { type, period, postpone, restrict, frequency, times } =
      fakeData.schedule('Fix', 'Day');

    restrict = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
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
      times,
      postpone,
      restrict,
      frequency,
    });
  });

  it('should add restricted schedule', async () => {
    let { type, period, postpone, restrict, frequency, times } =
      fakeData.schedule('Fix', 'Day');

    postpone = null;

    const scheduleId = await addScheduleId(app, {
      accessToken,
      studyId,
      configId,
      type,
      period,
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
      times,
      postpone,
      restrict,
      frequency,
    });
  });

  it('should fail because flexible daily not valid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Flexible',
      period: 'Day',
      amount: 1,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because unauthorized', async () => {
    return addSchedule(app, {
      accessToken: undefined,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return addSchedule(app, {
      accessToken: adminAccessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because director is not member of study', async () => {
    return addSchedule(app, {
      accessToken: otherAccessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because studyId is missing', async () => {
    return addSchedule(app, {
      accessToken,
      studyId: undefined,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because studyId is invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId: fakeData.text(),
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because studyId is unknown', async () => {
    return addSchedule(app, {
      accessToken,
      studyId: fakeData.id(),
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because configId is missing', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId: undefined,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because configId is invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId: fakeData.text(),
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because configId is unknown', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId: fakeData.id(),
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(401);
  });

  it('should because type invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix1',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because period invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day1',
      frequency: 2,
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
      period: 'Day',
      frequency: 0,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone has invalid type', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: fakeData.text(),
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone is empty', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {},
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone.times is missing', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: undefined,
        duration: 1,
      },
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone.times is wrong type', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: fakeData.text(),
        duration: 1,
      },
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone.times is zero', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: 0,
        duration: 1,
      },
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone.duration is missing', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: 1,
        duration: undefined,
      },
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone.duration is wrong type', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: 1,
        duration: fakeData.text(),
      },
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should because postpone.duration is zero', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: 1,
        duration: 0,
      },
      restrict: null,
      times: [fakeData.time()],
    }).expect(400);
  });

  it('should fail because times is missing', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 0,
      postpone: null,
      restrict: null,
      times: undefined,
    }).expect(400);
  });

  it('should fail because times is empty', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 0,
      postpone: null,
      restrict: null,
      times: [],
    }).expect(400);
  });

  it('should fail because times is invalid', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 0,
      postpone: null,
      restrict: null,
      times: ['44:00'],
    }).expect(400);
  });
});
