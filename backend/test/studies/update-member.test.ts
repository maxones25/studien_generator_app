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
  let director1Id: any;
  let director2Id: any;
  let accessToken1: string;
  let accessToken2: string;
  let studyId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const director1 = fakeData.director();
    const director2 = fakeData.director();
    const study = fakeData.study();

    director1Id = await createDirector(app, {
      ...director1,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    director2Id = await createDirector(app, {
        ...director2,
        activationPassword: process.env.ACTIVATION_PASSWORD,
      });

    accessToken1 = await getDirectorAccessToken(
      app,
      director1.email,
      director1.password,
    );

    accessToken2 = await getDirectorAccessToken(
      app,
      director2.email,
      director2.password,
    );

    studyId = await createStudy(app, accessToken1, study);
  });

  it('/PUT change employee to admin as employee' , () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/members/${director1Id}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send({
        directorId: director2Id,
        role: 'employee'
      })
      .expect(401);
  });

  it('/PUT change employee to admin successfully', () => {
    return request(app.getHttpServer())
      .put(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .send({
        role: 'admin',
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});