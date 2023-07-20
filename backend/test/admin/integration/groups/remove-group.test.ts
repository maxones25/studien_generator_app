import { Test, TestingModule } from '@nestjs/testing';
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
import { ValidationPipe } from '@nestjs/common';

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

  it('/DELETE remove group from study successfully', async () => {
    const group = fakeData.group();
    const groupId = await createGroup(app, accessToken, studyId, group);
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/groups/${groupId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
