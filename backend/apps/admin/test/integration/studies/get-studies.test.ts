import { AppModule } from '@admin/app.module';
import { Roles } from '@entities/core/study';
import { createDirector, getDirectorAccessToken } from '@test/admin/director';
import { createStudyId, createStudy, getStudies } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('Get Studies', () => {
  let app: IApp;
  let accessToken: string;
  let johnAccessToken: string;
  let studyIds: string[];

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    studyIds = [];
    studyIds.push(
      await createStudyId(app, { accessToken, data: fakeData.study() }),
    );
    studyIds.push(
      await createStudyId(app, { accessToken, data: fakeData.study() }),
    );
    studyIds.push(
      await createStudyId(app, { accessToken, data: fakeData.study() }),
    );

    johnAccessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    await createStudy(app, {
      accessToken: johnAccessToken,
      data: fakeData.study(),
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all studies by director', async () => {
    return getStudies(app, { accessToken })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(3);
        res.body.forEach((study) => {
          expect(studyIds.includes(study.id)).toBeTruthy();
          expect(typeof study.name).toBe('string');
          expect(study.role).toBe(Roles.Admin);
        });
      });
  });

  it('should not get studies by another director', async () => {
    return getStudies(app, { accessToken: johnAccessToken })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach((study) => {
          expect(studyIds.includes(study.id)).toBeFalsy();
        });
      });
  });
});
