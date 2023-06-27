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
import { LoginParticipantDto } from '../../src/modules/auth/dtos/LoginParticipantDto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;
  let groupId: string;
  let loginParticipantDto: LoginParticipantDto;

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

    const participant = fakeData.participant();
    loginParticipantDto = await createParticipant(app, accessToken, studyId, groupId, participant);
  });

  it('/POST login participant successfully',async () => {
    return request(app.getHttpServer())
      .post(`/auth/participants/login`)
      .send(loginParticipantDto)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toBe('string');
      })
  });

  it('/POST login participant with wrong id',async () => {
    return request(app.getHttpServer())
      .post(`/auth/participants/login`)
      .send({
        id: 'test',
        password: loginParticipantDto.password,
      })
      .expect(401)
  });

  it('/POST login participant with wrong password',async () => {
    return request(app.getHttpServer())
      .post(`/auth/participants/login`)
      .send({
        id: loginParticipantDto.id,
        password: 'test12345678'
      })
      .expect(401)
  });

  it('/POST login participant with empty id',async () => {
    return request(app.getHttpServer())
      .post(`/auth/participants/login`)
      .send({
        id: '',
        password: loginParticipantDto.password,
      })
      .expect(400)
  });

  it('/POST login participant with empty password',async () => {
    return request(app.getHttpServer())
      .post(`/auth/participants/login`)
      .send({
        email: loginParticipantDto.id,
        password: '',
      })
      .expect(400)
  });

  afterAll(async () => {
    await app.close();
  });
});