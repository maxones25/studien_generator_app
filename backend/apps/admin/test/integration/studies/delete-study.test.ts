import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fakeData from '@test/fakeData';
import { createApp, getDirectorAccessToken, createStudy } from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { Roles } from '@admin/roles/roles.enum';
import { AppModule } from '@admin/app.module';

describe('Delete Study', () => {
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

  it('should delete a study', async () => {
    const study = fakeData.study();
    const studyId = await createStudy(app, accessToken, study);

    await request(app.getHttpServer())
      .delete(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(parseInt(res.text)).toEqual(1);
      });

    await request(app.getHttpServer())
      .get(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401);
  });

  it('should fail because user is not an admin', async () => {
    const study = fakeData.study();
    const studyId = await createStudy(app, accessToken, study);

    return request(app.getHttpServer())
      .delete(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${johnAccessToken}`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
