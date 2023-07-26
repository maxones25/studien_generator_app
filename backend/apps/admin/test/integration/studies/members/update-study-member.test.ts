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

describe('Update Study Member', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update study members to admin successfully', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    const activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');

    const director = fakeData.director();

    const directorId = await createDirector(app, {
      activationPassword,
      ...director,
    });

    await addMember(app, accessToken, studyId, {
      directorId,
      role: Roles.employee,
    });

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/directors/${directorId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        role: Roles.admin,
      })
      .expect(200);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await request(app.getHttpServer())
      .get(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.role).toBe(Roles.admin);
      });
  });

  it('should successfully change admin', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    const activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');

    const director = fakeData.director();

    const directorId = await createDirector(app, {
      activationPassword,
      ...director,
    });

    await addMember(app, accessToken, studyId, {
      directorId,
      role: Roles.employee,
    });

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/directors/${directorId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        role: Roles.admin,
      })
      .expect(200);

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/directors/${TEST_DIRECTOR.MAX.ID}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .send({
        role: Roles.employee,
      })
      .expect(200);

    await request(app.getHttpServer())
      .get(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.role).toBe(Roles.employee);
      });
  });

  it('should fail because one admin per study is required', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/directors/${TEST_DIRECTOR.MAX.ID}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        role: Roles.employee,
      })
      .expect(400);
  });

  it('should fail director is not an admin', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    const activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');

    const director = fakeData.director();

    const directorId = await createDirector(app, {
      activationPassword,
      ...director,
    });

    await addMember(app, accessToken, studyId, {
      directorId,
      role: Roles.employee,
    });

    const otherAccessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    await request(app.getHttpServer())
      .put(`/studies/${studyId}/directors/${directorId}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .send({
        role: Roles.admin,
      })
      .expect(401);
  });
});
