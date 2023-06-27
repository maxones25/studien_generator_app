import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData from '../fakeData';
import {
  createDirector,
  createStudy,
  getDirectorAccessToken,
} from '../utils'; 
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;
  let studyId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

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

    studyId = await createStudy(app, accessToken, study)
  });

  it('/PUT update study successfully', () => {
    const updatedStudy = fakeData.study();
    return request(app.getHttpServer())
      .put(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedStudy)
      .expect(200);
  });

  it('/PUT update study with empty name', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: '',
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});