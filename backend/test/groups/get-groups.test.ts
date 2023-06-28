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
  getDirectorAccessToken,
} from '../utils';
import { ValidationPipe } from '@nestjs/common';
import { ParticipantDto } from '../../src/modules/participants/dtos/participantDto';
import { Participant } from '../../src/entities/participant.entity';

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

  it('/GET get all groups from study successfully', async () => {
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/groups`)
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
