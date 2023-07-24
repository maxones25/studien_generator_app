import { AppModule } from '@admin/app.module';
import { Roles } from '@admin/modules/roles/roles.enum';
import { INestApplication } from '@nestjs/common';
import fakeData from '@test/fakeData';
import { TEST_DIRECTOR } from '@test/testData';
import { createApp, createStudy, getDirectorAccessToken } from '@test/utils';
import * as request from 'supertest';

describe('Update Study', () => {
  let app: INestApplication;
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

  it('should update study successfully', async () => {
    const study = fakeData.study();
    const studyId = await createStudy(app, accessToken, study);
    const updatedStudy = fakeData.study();

    await request(app.getHttpServer())
      .put(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedStudy)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toEqual(studyId);
        expect(res.body.name).toEqual(updatedStudy.name);
        expect(res.body.role).toEqual(Roles.admin);
      });
  });

  it('should fail because name is empty', async () => {
    const study = fakeData.study();
    const studyId = await createStudy(app, accessToken, study);

    await request(app.getHttpServer())
      .put(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: '' })
      .expect(400);
  });

  it('should fail because name already exists', async () => {
    const study = fakeData.study();
    await createStudy(app, accessToken, study);
    const studyId = await createStudy(app, accessToken, fakeData.study());

    await request(app.getHttpServer())
      .put(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(422);
  });

  it('should fail because user is not an admin', async () => {
    const studyId = await createStudy(app, johnAccessToken, fakeData.study());

    await request(app.getHttpServer())
      .put(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fakeData.study())
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
