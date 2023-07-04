import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule as AdminAppModule } from '../../../src/admin.module';
import { AppModule } from '../../../src/study.module';
import fakeData from '../../fakeData';
import {
  createApp,
  createDirector,
  createGroup,
  createParticipant,
  createStudy,
  getDirectorAccessToken,
} from '../../utils';
import { LoginParticipantDto } from '../../../src/modules/auth/study/dtos/LoginParticipantDto';

describe('AppController (e2e)', () => {
  let adminApp: INestApplication;
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;
  let groupId: string;
  let loginParticipantDto: LoginParticipantDto;

  beforeAll(async () => {
    adminApp = await createApp(AdminAppModule);
    app = await createApp(AppModule);

    const director = fakeData.director();
    const study = fakeData.study();
    const group = fakeData.group();

    directorId = await createDirector(adminApp, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken = await getDirectorAccessToken(
      adminApp,
      director.email,
      director.password,
    );

    studyId = await createStudy(adminApp, accessToken, study);
    groupId = await createGroup(adminApp, accessToken, studyId, group);

    const participant = fakeData.participant();
    loginParticipantDto = await createParticipant(
      adminApp,
      accessToken,
      studyId,
      {number: participant.number, groupId},
    );
  });

  it('/POST login participant successfully', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send(loginParticipantDto)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toBe('string');
      });
  });

  it('/POST login participant with wrong id', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send({
        id: 'test',
        password: loginParticipantDto.password,
      })
      .expect(401);
  });

  it('/POST login participant with wrong password', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send({
        id: loginParticipantDto.id,
        password: 'test12345678',
      })
      .expect(401);
  });

  it('/POST login participant with empty id', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send({
        id: '',
        password: loginParticipantDto.password,
      })
      .expect(400);
  });

  it('/POST login participant with empty password', async () => {
    return request(app.getHttpServer())
      .post(`/auth/login`)
      .send({
        email: loginParticipantDto.id,
        password: '',
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
