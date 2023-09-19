import { AppModule } from '@admin/app.module';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import fakeData from '@test/fakeData';
import { createFormId } from '@test/forms/createForm';
import { createGroupId } from '@test/groups/createGroup';
import { createGroupFormId } from '@test/groups/forms/addFormToGroup';
import { getFormsByGroup } from '@test/groups/forms/getFormsByGroup';
import { createStudyId } from '@test/studies/createStudy';
import { TEST_DIRECTOR } from '@test/testData';

describe('get form configs', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let groupId: string;
  let groupData: any;
  let formId: string;
  let formData: any;
  let formConfigIds: string[];

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

    groupData = fakeData.group();

    groupId = await createGroupId(app, {
      accessToken,
      studyId,
      data: groupData,
    });

    formData = fakeData.form();

    formId = await createFormId(app, {
      accessToken,
      studyId,
      data: formData,
    });

    formConfigIds = [];

    formConfigIds.push(
      await createGroupFormId(app, { accessToken, studyId, groupId, formId }),
    );
    formConfigIds.push(
      await createGroupFormId(app, { accessToken, studyId, groupId, formId }),
    );
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should get form configs by group', async () => {
    return await getFormsByGroup(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const formConfigs = res.body;

        expect(Array.isArray(formConfigs)).toBeTruthy();
        expect(formConfigs.length).toBeGreaterThan(0);

        formConfigs.forEach((formConfig) => {
          expect(formConfigIds.includes(formConfig.id)).toBeTruthy();
          expect(validateUUID(formConfig.id)).toBeTruthy();
          expect(formConfig.isActive).toBeFalsy();
          expect(['TimeDependent', 'TimeIndependent']).toContain(
            formConfig.type,
          );
          expect(Array.isArray(formConfig.schedules)).toBeTruthy();
          expect(formConfig.form.id).toBe(formId);
          expect(formConfig.form.name).toBe(formData.name);
        });
      });
  });

  it('should not list form configs of other group', async () => {
    const groupId = await createGroupId(app, { accessToken, studyId });
    return await getFormsByGroup(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const formConfigs = res.body;

        expect(Array.isArray(formConfigs)).toBeTruthy();
        expect(formConfigs.length).toBe(0);
      });
  });

  it('should fail because unauthorized', async () => {
    return await getFormsByGroup(app, {
      accessToken: undefined,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    return await getFormsByGroup(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    return await getFormsByGroup(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return await getFormsByGroup(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return await getFormsByGroup(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return await getFormsByGroup(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    return await getFormsByGroup(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    return await getFormsByGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because groupId is unkown', async () => {
    return await getFormsByGroup(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
