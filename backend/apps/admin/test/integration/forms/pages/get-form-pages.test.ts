import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getFormPages } from '@test/forms/pages/getFormPages';
import { addFormPage, createFormPage } from '@test/forms/pages/addFormPage';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import fakeData from '@test/fakeData';

describe('add form pages', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;
  let pageIds: any[];

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

    formId = await createFormId(app, { accessToken, studyId });

    pageIds = [];

    for (let i = 0; i < 3; i++) {
      const pageId = await createFormPage(app, {
        accessToken,
        studyId,
        formId,
      });

      pageIds.push(pageId);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get form pages', async () => {
    await getFormPages(app, { accessToken, studyId, formId })
      .expect(200)
      .then(async (res) => {
        const pages = res.body;

        expect(Array.isArray(pages)).toBe(true);
        expect(pages.length).toBe(4);

        pageIds.forEach((pageId, i) => {
          const page = pages.find((page) => page.id === pageId);

          expect(page.id).toBe(pageId);
          expect(page.number).toBe(i + 2);
        });
      });
  });

  it('should get get pages of other form', async () => {
    const formId = await createFormId(app, { accessToken, studyId });
    await getFormPages(app, { accessToken, studyId, formId })
      .expect(200)
      .then(async (res) => {
        const pages = res.body;

        expect(Array.isArray(pages)).toBe(true);
        expect(pages.length).toBe(1);

        pageIds.forEach((pageId, i) => {
          const page = pages.find((page) => page.id === pageId);

          expect(page).toBeUndefined();
        });
      });
  });

  it('should fail because unauthorized', async () => {
    await getFormPages(app, { accessToken: undefined, studyId, formId }).expect(
      401,
    );
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    await getFormPages(app, {
      accessToken: adminAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    await getFormPages(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    await getFormPages(app, {
      accessToken,
      studyId: undefined,
      formId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    await getFormPages(app, {
      accessToken,
      studyId: fakeData.text(),
      formId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    await getFormPages(app, {
      accessToken,
      studyId: fakeData.id(),
      formId,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    await getFormPages(app, {
      accessToken,
      studyId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    await getFormPages(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    await getFormPages(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
