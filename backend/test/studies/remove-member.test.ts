import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData from '../fakeData';
import {
  addMember,
  createDirector,
  createStudy,
  getDirectorAccessToken,
} from '../utils';
import { ValidationPipe } from '@nestjs/common';
import { Roles } from '../../src/enums/roles.enum';

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
    await addMember(app, accessToken1, studyId, {directorId: director2Id, role: Roles.employee})
  });

  it('/DELETE remove last admin from study' , () => {
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/members/${director1Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .expect(409);
  });

  it('/DELETE remove employee from study successfully' , () => {
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .expect(200);
  });

  it('/DELETE remove admin from study successfully' , async () => {
    await addMember(app, accessToken1, studyId, {directorId: director2Id, role: Roles.admin})
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken1}`)
      .expect(200);
  });

  it('/DELETE remove employee from study as employee' , async () => {
    await addMember(app, accessToken1, studyId, {directorId: director2Id, role: Roles.employee})
    return request(app.getHttpServer())
      .delete(`/studies/${studyId}/members/${director2Id}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});