import { AppModule } from '@admin/app.module';
import {
  getAdminAccessToken,
  createDirector,
  getDirectorAccessToken,
} from '@test/admin/director';
import {
  createFormId,
  createFormPage,
  removeFormPage,
  getFormPages,
} from '@test/admin/forms';
import { createStudyId, addMember } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('remove form page', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;
  let studyId: string;
  let formId: string;
  let pageId: string;

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
    pageId = await createFormPage(app, { accessToken, studyId, formId });
  });

  it('should remove form page', async () => {
    await removeFormPage(app, { accessToken, studyId, pageId }).expect(200);

    return getFormPages(app, { accessToken, studyId, formId })
      .expect(200)
      .then((res) => {
        const pages = res.body;

        expect(Array.isArray(pages)).toBe(true);
        expect(pages.length).toBe(1);

        expect(pages[0].id).not.toBe(pageId);
      });
  });

  it('should because unauthorized', async () => {
    return removeFormPage(app, {
      accessToken: undefined,
      studyId,
      pageId,
    }).expect(401);
  });

  it('should because unauthorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return removeFormPage(app, {
      accessToken: adminAccessToken,
      studyId,
      pageId,
    }).expect(401);
  });

  it('should because director is not member of study', async () => {
    return removeFormPage(app, {
      accessToken: otherAccessToken,
      studyId,
      pageId,
    }).expect(401);
  });

  it('should because director is not admin', async () => {
    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    return removeFormPage(app, {
      accessToken: otherAccessToken,
      studyId,
      pageId,
    }).expect(401);
  });

  it('should because studyId is missing', async () => {
    return removeFormPage(app, {
      accessToken,
      studyId: undefined,
      pageId,
    }).expect(400);
  });

  it('should because studyId is invalid', async () => {
    return removeFormPage(app, {
      accessToken,
      studyId: fakeData.text(),
      pageId,
    }).expect(401);
  });

  it('should because studyId is unknown', async () => {
    return removeFormPage(app, {
      accessToken,
      studyId: fakeData.id(),
      pageId,
    }).expect(401);
  });

  it('should because pageId is missing', async () => {
    return removeFormPage(app, {
      accessToken,
      studyId,
      pageId: undefined,
    }).expect(400);
  });

  it('should because pageId is invalid', async () => {
    return removeFormPage(app, {
      accessToken,
      studyId,
      pageId: fakeData.text(),
    }).expect(401);
  });

  it('should because pageId is unknown', async () => {
    return removeFormPage(app, {
      accessToken,
      studyId,
      pageId: fakeData.id(),
    }).expect(401);
  });
});
