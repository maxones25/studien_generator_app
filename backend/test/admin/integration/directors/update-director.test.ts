import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import { createApp, createDirector, getDirectorAccessToken } from '../../utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = fakeData.director();

    directorId = await createDirector(app, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  });

  it('/PUT update director successfully', async () => {
    const updatedDirector = fakeData.director();
    return request(app.getHttpServer())
      .put(`/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedDirector)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
