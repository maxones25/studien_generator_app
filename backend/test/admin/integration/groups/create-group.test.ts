import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import {
  createApp,
  createDirector,
  createStudy,
  getDirectorAccessToken,
} from '../../utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

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

  it('/POST add group to study successfully', () => {
    const group = fakeData.group();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/groups`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(group)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
