import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createFormId } from '@test/admin/forms';
import {
  createGroupId,
  getAvailableFormConfigs,
  createGroupFormId,
} from '@test/admin/groups';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('get available form configs', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;
  let formData: any;

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

    formData = fakeData.form();

    formId = await createFormId(app, { accessToken, studyId, data: formData });
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should get available form configs by group', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBeTruthy();
        expect(forms.length).toBe(1);

        forms.forEach((form) => {
          expect(form.id).toBe(formId);
          expect(form.name).toBe(formData.name);
        });
      });
  });

  it('should have no available form configs', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    await createGroupFormId(app, { accessToken, studyId, groupId, formId });
    await createGroupFormId(app, { accessToken, studyId, groupId, formId });

    return await getAvailableFormConfigs(app, { accessToken, studyId, groupId })
      .expect(200)
      .then((res) => {
        const forms = res.body;

        expect(Array.isArray(forms)).toBeTruthy();
        expect(forms.length).toBe(0);
      });
  });

  it('should fail because unauthorized', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken: undefined,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    const adminAccessToken = await getAdminAccessToken(app);

    return await getAvailableFormConfigs(app, {
      accessToken: adminAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken: otherAccessToken,
      studyId,
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken,
      studyId: undefined,
      groupId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken,
      studyId: fakeData.text(),
      groupId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken,
      studyId: fakeData.id(),
      groupId,
    }).expect(401);
  });

  it('should fail because groupId is missing', async () => {
    const groupId = await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken,
      studyId,
      groupId: undefined,
    }).expect(400);
  });

  it('should fail because groupId is invalid', async () => {
    await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken,
      studyId,
      groupId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because groupId is unknown', async () => {
    await createGroupId(app, {
      accessToken,
      studyId,
    });

    return await getAvailableFormConfigs(app, {
      accessToken,
      studyId,
      groupId: fakeData.id(),
    }).expect(401);
  });
});
