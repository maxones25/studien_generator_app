import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
} from '@test/admin/director';
import { createFormId, changeFormName, getFormById } from '@test/admin/forms';
import { createStudyId } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('change form name', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;

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
  });

  afterAll(async () => {
    return await app.close();
  });

  it('should change name', async () => {
    const formId = await createFormId(app, { accessToken, studyId });

    const name = fakeData.form().name;

    await changeFormName(app, {
      accessToken,
      studyId,
      formId,
      data: { name },
    }).expect(200);

    return getFormById(app, { accessToken, studyId, formId })
      .expect(200)
      .then((res) => {
        const form = res.body;

        expect(form.name).toBe(name);
      });
  });

  it('should fail because unauthorized', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken: undefined,
      studyId,
      formId,
      data: { name },
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken: adminAccessToken,
      studyId,
      formId,
      data: { name },
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    const formId = await createFormId(app, {
      accessToken,
      studyId,
    });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
      data: { name },
    }).expect(401);
  });

  it('should fail because studyId missing', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId: undefined,
      formId,
      data: { name },
    }).expect(400);
  });

  it('should fail because studyId invalid', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId: 'undefined123',
      formId,
      data: { name },
    }).expect(401);
  });

  it('should fail because studyId unknown', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId: fakeData.id(),
      formId,
      data: { name },
    }).expect(401);
  });

  it('should fail because formId missing', async () => {
    await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId,
      formId: undefined,
      data: { name },
    }).expect(400);
  });

  it('should fail because formId invalid', async () => {
    await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId,
      formId: 'undsdfsdefined',
      data: { name },
    }).expect(401);
  });

  it('should fail because formId unknown', async () => {
    await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
      data: { name },
    }).expect(401);
  });

  it('should fail because name missing', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId,
      formId,
      data: {},
    }).expect(400);
  });

  it('should fail because name is empty', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    const name = fakeData.form().name;
    return changeFormName(app, {
      accessToken,
      studyId,
      formId,
      data: { name: '' },
    }).expect(400);
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.form();
    await createFormId(app, { accessToken, studyId, data });

    const formId = await createFormId(app, { accessToken, studyId });

    return changeFormName(app, {
      accessToken,
      studyId,
      formId,
      data: { name: data.name },
    }).expect(422);
  });
});
