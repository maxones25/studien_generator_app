import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData from '../fakeData';
import {
  createDirector,
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

  it('/POST create study successfully', () => {
    const study = fakeData.study();
    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.id).toBe('string');
      });
  });

  it('/POST create study with empty name', () => {
    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: '',
      })
      .expect(400);
  });

  it('/POST create study with existing name', () => {
    const study = fakeData.study();

    return request(app.getHttpServer())
      .post('/studies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(study)
      .expect(201)
      .then((res) => {
        expect(typeof res.body.id).toBe('string');

        return request(app.getHttpServer())
          .post('/studies')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(study)
          .expect(422);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
