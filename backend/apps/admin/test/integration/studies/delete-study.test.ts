import { AppModule } from '@admin/app.module';
import { getDirectorAccessToken } from '@test/admin/director';
import { createStudyId, deleteStudy, getStudyById } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('Delete Study', () => {
  let app: IApp;
  let accessToken: string;
  let johnAccessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should hard delete a study', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, { accessToken, data });

    await deleteStudy(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getStudyById(app, { accessToken, studyId }).expect(401);
  });

  it('should soft delete a study', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, { accessToken, data });

    await deleteStudy(app, { accessToken, studyId, hardDelete: false })
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await getStudyById(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(res.body.deletedAt).not.toBeNull();
      });
  });

  it('should fail because user is not an admin', async () => {
    const data = fakeData.study();
    const studyId = await createStudyId(app, {
      accessToken: johnAccessToken,
      data,
    });

    return deleteStudy(app, { accessToken, studyId }).expect(401);
  });
});
