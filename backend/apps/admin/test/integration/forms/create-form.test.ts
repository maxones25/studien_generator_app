import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import fakeData from '@test/fakeData';
import { createApp, createStudy, getDirectorAccessToken } from '@test/utils';
import { TEST_DIRECTOR } from '@test/testData';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { AppModule } from '@admin/app.module';

describe.skip('Create Form', () => {
  let app: INestApplication;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);
    accessToken = await getDirectorAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    );
    studyId = await createStudy(app, accessToken, fakeData.study());
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a form successfully', () => {
    const group = fakeData.form();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/forms`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(201)
      .then((res) => {
        expect(validateUUID(res.text)).toBeTruthy();
      });
  });
});
