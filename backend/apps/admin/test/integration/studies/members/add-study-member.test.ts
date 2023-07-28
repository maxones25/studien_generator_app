import { INestApplication } from '@nestjs/common';
import request from 'supertest';
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
import { Roles } from '@admin/roles/roles.enum';
import fakeData from '@test/fakeData';
import { faker } from '@faker-js/faker';

describe('Add Study Member', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;
  let directorId: string;
  let directorId2: string;
  let otherAccessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );

    studyId = await createStudy(app, accessToken, fakeData.study());

    const activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');

    const otherDirector = fakeData.director();

    directorId = await createDirector(app, {
      activationPassword,
      ...otherDirector,
    });

    directorId2 = await createDirector(app, {
      activationPassword,
      ...fakeData.director(),
    });

    otherAccessToken = await getDirectorAccessToken(
      app,
      otherDirector.email,
      otherDirector.password,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should add a new member to the study', async () => {
    await request(app.getHttpServer())
      .get(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .expect(422);

    const role = Roles.admin;

    await request(app.getHttpServer())
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        directorId,
        role,
      })
      .expect(201);

    await request(app.getHttpServer())
      .get(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.role).toBe(role);
      });
  });

  it('should fail because director is already a member', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        directorId: TEST_DIRECTOR.MAX.ID,
        role: Roles.employee,
      })
      .expect(422);
  });

  it('should fail because director does not exist', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        directorId: fakeData.id(),
        role: Roles.employee,
      })
      .expect(422);
  });

  it('should fail because director is not an admin', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    await addMember(app, accessToken, studyId, {
      directorId,
      role: Roles.employee,
    });

    return request(app.getHttpServer())
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .send({
        directorId: directorId2,
        role: Roles.employee,
      })
      .expect(401);
  });

  it('should fail because directorId invalid', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        directorId: faker.string.alphanumeric(10),
        role: Roles.employee,
      })
      .expect(422);
  });

  it('should fail because role invalid', () => {
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        directorId: fakeData.id(),
        role: faker.string.alphanumeric(6),
      })
      .expect(422);
  });
});
