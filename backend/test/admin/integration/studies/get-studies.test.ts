import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import { createApp, createDirector, createStudy, getDirectorAccessToken } from '../../utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule)

    const director = fakeData.director();
    const study = fakeData.study();

    directorId = await createDirector(app, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );

    studyId = await createStudy(app, accessToken, study);
  });

  it('/GET get studies for director succesfully', () => {
    const study = fakeData.study();
    return request(app.getHttpServer())
      .get(`/studies`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(1);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
