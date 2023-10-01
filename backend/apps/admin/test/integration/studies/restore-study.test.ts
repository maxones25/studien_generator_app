import { AppModule } from '@admin/app.module';
import {
  getDirectorAccessToken,
  getAdminAccessToken,
  createDirector,
} from '@test/admin/director';
import {
  createStudyId,
  deleteStudy,
  restoreStudy,
  getStudyById,
  addMember,
} from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('restore Study', () => {
  let app: IApp;
  let accessToken: string;
  let otherAccessToken: string;

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
  });

  afterAll(async () => {
    await app.close();
  });

  it('should restore study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    await restoreStudy(app, { accessToken, studyId }).expect(200);

    await getStudyById(app, { accessToken, studyId }).expect(200);
  });

  it('should fail because study is hard deleted', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: true }).expect(
      200,
    );

    await restoreStudy(app, { accessToken, studyId }).expect(401);
  });

  it('should fail because unauthorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    await restoreStudy(app, { accessToken: undefined, studyId }).expect(401);
  });

  it('should fail because admin is authorized', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    const adminAccessToken = await getAdminAccessToken(app);

    await restoreStudy(app, { accessToken: adminAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because director is not member of study', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    await restoreStudy(app, { accessToken: otherAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because director is not admin', async () => {
    const studyId = await createStudyId(app, { accessToken });

    const director = await createDirector(app);

    await addMember(app, {
      accessToken,
      studyId,
      directorId: director.id,
      role: 'employee',
    }).expect(201);

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await restoreStudy(app, { accessToken: otherAccessToken, studyId }).expect(
      401,
    );
  });

  it('should fail because studyId is missing', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    await restoreStudy(app, { accessToken, studyId: undefined }).expect(400);
  });

  it('should fail because studyId is invalid', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    await restoreStudy(app, { accessToken, studyId: fakeData.text() }).expect(
      401,
    );
  });

  it('should fail because studyId is unknown', async () => {
    const studyId = await createStudyId(app, { accessToken });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false }).expect(
      200,
    );

    await restoreStudy(app, { accessToken, studyId: fakeData.text() }).expect(
      401,
    );
  });
});
