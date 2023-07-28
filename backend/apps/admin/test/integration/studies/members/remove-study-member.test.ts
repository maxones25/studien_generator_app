import { AppModule } from '@admin/app.module';
import { Roles } from '@admin/roles/roles.enum';
import { INestApplication } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';
import {
  addMember,
  createApp,
  createDirector,
  createStudy,
  getDirectorAccessToken,
  getEnv,
} from '@test/utils';
import request from 'supertest';

describe('Remove Study Member', () => {
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

  it('should successfully remove a study member given a valid studyId and directorId', async () => {
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
      .delete(`/studies/${studyId}/directors/${directorId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('should successfully change admin and remove former admin', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    const activationPassword = getEnv(app, 'ACTIVATION_PASSWORD');

    const director = fakeData.director();

    const directorId = await createDirector(app, {
      activationPassword,
      ...director,
    });

    await addMember(app, accessToken, studyId, {
      directorId,
      role: Roles.admin,
    });

    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/directors/${TEST_DIRECTOR.MAX.ID}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  it('should throw an error if invalid directorId is provided', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/directors/invalid-id`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should throw an error when trying to remove a non-existing study member', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());

    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/directors/${fakeData.id()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because director is not an admin', async () => {
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
      .delete(`/studies/${studyId}/directors/${directorId}`)
      .set('Authorization', `Bearer ${otherAccessToken}`)
      .expect(401);
  });

  it('should throw an error when trying to remove the last admin from the study', async () => {
    const studyId = await createStudy(app, accessToken, fakeData.study());
    await request(app.getHttpServer())
      .delete(`/studies/${studyId}/directors/${TEST_DIRECTOR.MAX.ID}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(400);
  });
});
