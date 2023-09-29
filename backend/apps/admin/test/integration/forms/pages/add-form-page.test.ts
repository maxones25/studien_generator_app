import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getFormPages } from '@test/forms/pages/getFormPages';
import { addFormPage } from '@test/forms/pages/addFormPage';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import fakeData from '@test/fakeData';

describe('add form page', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;

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
    await app.close();
  });

  beforeEach(async () => {
    formId = await createFormId(app, { accessToken, studyId });
  });

  it('should add form page', async () => {
    await addFormPage(app, { accessToken, studyId, formId })
      .expect(201)
      .then(async (res) => {
        const page = res.body;

        expect(validateUUID(page.id)).toBeTruthy();
        expect(page.number).toBe(2);

        await getFormPages(app, { accessToken, studyId, formId })
          .expect(200)
          .then((res) => {
            const pages = res.body;

            expect(Array.isArray(pages)).toBe(true);
            expect(pages.length).toBe(2);
          });
      });
  });

  it('should fail because unauthorized', async () => {
    await addFormPage(app, { accessToken: undefined, studyId, formId }).expect(
      401,
    );
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);

    await addFormPage(app, {
      accessToken: adminAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    await addFormPage(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    await addFormPage(app, {
      accessToken,
      studyId: undefined,
      formId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    await addFormPage(app, {
      accessToken,
      studyId: fakeData.text(),
      formId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    await addFormPage(app, {
      accessToken,
      studyId: fakeData.id(),
      formId,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    await addFormPage(app, {
      accessToken,
      studyId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    await addFormPage(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    await addFormPage(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
