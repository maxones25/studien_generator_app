import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createFormId } from '@test/forms/createForm';
import { createGroupId } from '@test/groups/createGroup';
import { createGroupFormId } from '@test/groups/forms/addFormToGroup';
import { addSchedule } from '@test/groups/forms/schedules/addSchedule';
import { createStudyId } from '@test/studies/createStudy';
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
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: null,
      times: [fakeData.time()],
    })
      .expect(201)
      .then((res) => {
        const id = res.text;
        expect(validateUUID(id)).toBe(true);
      });
  });

  it('should add postponable schedule', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: {
        times: 2,
        duration: 1,
      },
      restrict: null,
      times: [fakeData.time()],
    })
      .expect(201)
      .then((res) => {
        const id = res.text;
        expect(validateUUID(id)).toBe(true);
      });
  });

  it('should add restricted schedule', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Day',
      frequency: 2,
      postpone: null,
      restrict: {
        before: 2,
        after: 4,
      },
      times: [fakeData.time()],
    })
      .expect(201)
      .then((res) => {
        const id = res.text;
        expect(validateUUID(id)).toBe(true);
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
