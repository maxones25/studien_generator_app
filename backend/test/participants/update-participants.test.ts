import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData from '../fakeData';
import {
  createDirector,
  createGroup,
  createParticipant,
  createStudy,
  deleteDirector,
  deleteStudy,
  getDirectorAccessToken,
} from '../utils';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;
  let groupId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

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

  it('/PUT remove participant from group successfully',async () => {
    const participant = fakeData.participant();
    const participantId = await createParticipant(app, accessToken, studyId, groupId, participant);
    const updateParticipant = fakeData.participant();
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/participants/${participantId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updateParticipant)
      .expect(200);
  });

  afterAll(async () => {
    await deleteStudy(app, accessToken, studyId);
    await deleteDirector(app, accessToken);
    await app.close();
  });
});