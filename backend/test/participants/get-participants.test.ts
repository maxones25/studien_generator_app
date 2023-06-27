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
  let group1Id: string;
  let group2Id: string;
  let participant1: ParticipantDto;
  let participant2: ParticipantDto;
  let participant3: ParticipantDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const director = fakeData.director();
    const study = fakeData.study();
    const group1 = fakeData.group();
    const group2 = fakeData.group();
    participant1 = fakeData.participant();
    participant2 = fakeData.participant();
    participant3 = fakeData.participant();

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
    group1Id = await createGroup(app, accessToken, studyId, group1);
    group2Id = await createGroup(app, accessToken, studyId, group2);
    await createParticipant(app, accessToken, studyId, group1Id, participant1);
    await createParticipant(app, accessToken, studyId, group1Id, participant2);
    await createParticipant(app, accessToken, studyId, group2Id, participant3);
  });

  it('/GET get all participants from study successfully', async () => {
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/participants`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(3);
      });
  });

  it('/GET get all participants from group1 successfully', async () => {
    return request(app.getHttpServer())
      .get(`/studies/${studyId}/groups/${group1Id}/participants`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(2);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
