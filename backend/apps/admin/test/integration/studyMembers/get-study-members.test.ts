import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  addMember,
  createApp,
  createDirector,
  createStudy,
  getDirectorAccessToken,
  getEnv,
} from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { AppModule } from '@admin/app.module';
import fakeData from '@test/fakeData';
import { Roles } from '@admin/roles/roles.enum';
import { AddMemberDto } from '@admin/studies/members/dtos/AddMemberDto';

describe('Get Study Members', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let directors: AddMemberDto[] = [];

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

    studyId = await createStudy(app, accessToken, fakeData.study());

    const activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');

    for (let i = 0; i < 2; i++) {
      const directorId = await createDirector(app, {
        activationPassword,
        ...fakeData.director(),
      });

      const role = Roles.employee;

      await addMember(app, accessToken, studyId, {
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
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0)
        res.body.forEach(({ role, director }) => {
          const findDirector = directors.find(
            (d) => d.directorId === director.id,
          );
          expect(findDirector).not.toBe(undefined);
          expect(role).toBe(findDirector.role)
        });
      });
  });

  it('should fail because director is not member of study', async () => {
    const accessToken = await getDirectorAccessToken(app, TEST_DIRECTOR.JOHN.EMAIL, TEST_DIRECTOR.JOHN.PASSWORD)

    return request(app.getHttpServer())
      .get(`/studies/invalid-id/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });
});
