import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/admin.module';
import fakeData from '../../fakeData';
import {
  createApp,
  createDirector,
  createGroup,
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

  it('/PUT update group successfully', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);
    const updatedGroup = fakeData.group();
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedGroup)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
