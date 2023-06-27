import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData from '../fakeData';
import {
  createDirector,
} from '../utils';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let director= fakeData.director();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await createDirector(app, {
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    });
  
  });

  it('/POST login director successfully',async () => {
    return request(app.getHttpServer())
      .post(`/auth/directors/login`)
      .send({
        email: director.email,
        password: director.password,
      })
      .expect(201)
      .then((res) => {
        expect(typeof res.body.accessToken).toBe('string');
      })
  });

  it('/POST login director with empty email',async () => {
    return request(app.getHttpServer())
      .post(`/auth/directors/login`)
      .send({
        email: '',
        password: director.password,
      })
      .expect(400)
  });

  it('/POST login director with empty password',async () => {
    return request(app.getHttpServer())
      .post(`/auth/directors/login`)
      .send({
        email: director.email,
        password: '',
      })
      .expect(400)
  });

  it('/POST login director with wrong email',async () => {
    return request(app.getHttpServer())
      .post(`/auth/directors/login`)
      .send({
        email: 'test@test.de',
        password: director.password,
      })
      .expect(401)
  });

  it('/POST login director with wrong password',async () => {
    return request(app.getHttpServer())
      .post(`/auth/directors/login`)
      .send({
        email: director.email,
        password: 'test'
      })
      .expect(401)
  });

  it('/POST login director with invalid email',async () => {
    return request(app.getHttpServer())
      .post(`/auth/directors/login`)
      .send({
        email: 'test',
        password: director.password,
      })
      .expect(400)
  });

  afterAll(async () => {
    await app.close();
  });
});