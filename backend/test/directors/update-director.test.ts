import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData, { director } from '../fakeData';
import {
  createDirector,
  deleteDirector,
  getDirectorAccessToken,
} from '../utils';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let directorId: any;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const director = fakeData.director();

    directorId = await createDirector(app, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  
  });

  it('/PUT update director successfully',async () => {
    const updatedDirector = fakeData.director();
    return request(app.getHttpServer())
      .put(`/directors`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedDirector)
      .expect(200);
  });

  afterAll(async () => {
    await deleteDirector(app, accessToken);
    await app.close();
  });
});