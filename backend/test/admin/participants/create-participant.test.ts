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
  let groupId: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = fakeData.director();
    const study = fakeData.study();
    const group = fakeData.group();

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
    groupId = await createGroup(app, accessToken, studyId, group);
  });

  it('/POST add participant to group successfully', () => {
    const participant = fakeData.participant();
    return request(app.getHttpServer())
      .post(`/studies/${studyId}/groups/${groupId}/participants`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(participant)
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
