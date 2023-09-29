import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import { createStudyId } from '@test/studies/createStudy';
import { createFormId } from '@test/forms/createForm';
import fakeData from '@test/fakeData';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { IApp, createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { deleteForm } from '@test/forms/deleteForm';
import { getFormById } from '@test/forms/getFormById';
import { createDirector } from '@test/director/signUpDirector';
import { addMember } from '@test/studies/members/addMember';

describe('delete Form', () => {
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

  it('should delete form', async () => {
    await deleteForm(app, { accessToken, studyId, formId }).expect(200);
    return getFormById(app, { accessToken, studyId, formId }).expect(401);
  });

  it('should fail because unauthorized', async () => {
    return deleteForm(app, { accessToken: undefined, studyId, formId }).expect(
      401,
    );
  });

  it('should fail because admin is authorized', async () => {
    const adminAccessToken = await getAdminAccessToken(app);
    return deleteForm(app, {
      accessToken: adminAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    return deleteForm(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because director is not member of study', async () => {
    return deleteForm(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because director is not admin', async () => {
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

    return deleteForm(app, {
      accessToken: otherAccessToken,
      studyId,
      formId,
    }).expect(401);
  });

  it('should fail because studyId is missing', async () => {
    return deleteForm(app, {
      accessToken,
      studyId: undefined,
      formId,
    }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    return deleteForm(app, {
      accessToken,
      studyId: fakeData.text(),
      formId,
    }).expect(401);
  });

  it('should fail because studyId is unknown', async () => {
    return deleteForm(app, {
      accessToken,
      studyId: fakeData.id(),
      formId,
    }).expect(401);
  });

  it('should fail because formId is missing', async () => {
    return deleteForm(app, {
      accessToken,
      studyId,
      formId: undefined,
    }).expect(400);
  });

  it('should fail because formId is invalid', async () => {
    return deleteForm(app, {
      accessToken,
      studyId,
      formId: fakeData.text(),
    }).expect(401);
  });

  it('should fail because formId is unknown', async () => {
    return deleteForm(app, {
      accessToken,
      studyId,
      formId: fakeData.id(),
    }).expect(401);
  });
});
