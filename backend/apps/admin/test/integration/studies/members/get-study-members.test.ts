import { INestApplication } from '@nestjs/common';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { Roles } from '@admin/roles/roles.enum';
import { createStudyId } from '@test/studies/createStudy';
import { addMember } from '@test/studies/members/addMember';
import { getMembers } from '@test/studies/members/getMembers';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { createDirector } from '@test/director/signUpDirector';
import { createApp } from '@test/app/createApp';

describe('Get Study Members', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let directors = [];

  beforeAll(async () => {
    app = await createApp(AppModule);

    directors.push({
      directorId: TEST_DIRECTOR.MAX.ID,
      role: Roles.admin,
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

      const role = Roles.employee;

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
