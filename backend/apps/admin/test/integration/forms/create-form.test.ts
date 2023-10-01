import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createForm } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/admin/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/admin/auth/loginAdmin';
import { getFormById } from '@test/forms/getFormById';
import { getFormPages } from '@test/forms/pages/getFormPages';

describe('Create Form', () => {
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
    await app.close();
  });

  it('should create a form', async () => {
    await createForm(app, { accessToken, studyId })
      .expect(201)
      .then(async (res) => {
        const formId = res.text;

        expect(validateUUID(formId)).toBeTruthy();

        await getFormById(app, { accessToken, studyId, formId }).expect(200);

        await getFormPages(app, { accessToken, studyId, formId })
          .expect(200)
          .then((res) => {
            const pages = res.body;

            expect(Array.isArray(pages)).toBe(true);
            expect(pages.length).toBe(1);
          });
      });
  });

  it('should fail because unauthorized', () => {
    return createForm(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const accessToken = await getAdminAccessToken(app);
    return createForm(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because studyId invalid', () => {
    const studyId = 'invalid-id';
    return createForm(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because studyId not exists', () => {
    const studyId = fakeData.id();
    return createForm(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because director is not part of study', async () => {
    const studyId = await createStudyId(app, { accessToken: otherAccessToken });

    return createForm(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because name is missing', async () => {
    return createForm(app, { accessToken, studyId, data: {} }).expect(400);
  });

  it('should fail because name is empty', async () => {
    return createForm(app, { accessToken, studyId, data: { name: '' } }).expect(
      400,
    );
  });

  it('should fail because name already exists', async () => {
    const data = fakeData.form();

    await createForm(app, { accessToken, studyId, data }).expect(201);

    return createForm(app, { accessToken, studyId, data }).expect(422);
  });

  it('should create form even when name exists on other study', async () => {
    const otherStudyId = await createStudyId(app, {
      accessToken: otherAccessToken,
    });

    const data = fakeData.form();

    await createForm(app, {
      accessToken: otherAccessToken,
      studyId: otherStudyId,
      data,
    }).expect(201);

    return createForm(app, { accessToken, studyId, data }).expect(201);
  });
});
