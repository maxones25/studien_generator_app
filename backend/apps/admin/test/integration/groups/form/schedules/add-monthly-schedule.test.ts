import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createFormId } from '@test/forms/createForm';
import { createGroupId } from '@test/groups/createGroup';
import { createGroupFormId } from '@test/groups/forms/addFormToGroup';
import { addSchedule } from '@test/groups/forms/schedules/addSchedule';
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

    formId = await createFormId(app, { accessToken, studyId });

    configId = await createGroupFormId(app, {
      accessToken,
      studyId,
      groupId,
      formId,
    });
  });

  afterAll(() => app.close());

  it('should add fix monthly schedule', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Fix',
      period: 'Month',
      daysOfMonth: [1, 8, 15, 22],
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

  it('should add flexible monthly schedule', async () => {
    return addSchedule(app, {
      accessToken,
      studyId,
      configId,
      type: 'Flexible',
      period: 'Month',
      amount: 8,
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
});
