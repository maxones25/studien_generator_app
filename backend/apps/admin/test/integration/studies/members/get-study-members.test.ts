import { AppModule } from '@admin/app.module';
import { Roles } from '@entities/core/study';
import { getDirectorAccessToken, createDirector } from '@test/admin/director';
import { createStudyId, addMember, getMembers } from '@test/admin/studies';
import { IApp, createApp } from '@test/app';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';

describe('Get Study Members', () => {
  let app: IApp;
  let accessToken: string;
  let studyId: string;
  let directors = [];

  beforeAll(async () => {
    app = await createApp(AppModule);

    directors.push({
      directorId: TEST_DIRECTOR.MAX.ID,
      role: Roles.Admin,
    });

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudyId(app, { accessToken, data: fakeData.study() });

    for (let i = 0; i < 2; i++) {
      const director = await createDirector(app);

      const directorId = director.id;

      const role = Roles.Employee;

      await addMember(app, {
        accessToken,
        studyId,
        directorId,
        role,
      });

      directors.push({ directorId, role });
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get study members successfully', () => {
    return getMembers(app, { accessToken, studyId })
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
        res.body.forEach(({ role, director }) => {
          const findDirector = directors.find(
            (d) => d.directorId === director.id,
          );
          expect(findDirector).not.toBe(undefined);
          expect(role).toBe(findDirector.role);
        });
      });
  });

  it('should fail because director is not member of study', async () => {
    const accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    );

    return getMembers(app, { accessToken, studyId: 'invalid-id' }).expect(401);
  });
});
