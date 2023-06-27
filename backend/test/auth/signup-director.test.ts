import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import fakeData from '../fakeData';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/POST signup director successfully',async () => {
    const director = fakeData.director();
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    })
    .expect(201)
    .then((res) => {
      expect(res.body).toHaveProperty('id');
    });
  });

  it('/POST signup director with wrong ActivationPassword',async () => {
    const director = fakeData.director();
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: 'test',
    })
    .expect(401)
  });

  it('/POST signup director with empty firstName',async () => {
    const director = fakeData.director();
    director.firstName = '';
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    })
    .expect(400)
  });

  it('/POST signup director with empty lastName',async () => {
    const director = fakeData.director();
    director.lastName = '';
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    })
    .expect(400)
  });

  it('/POST signup director with empty email',async () => {
    const director = fakeData.director();
    director.email = '';
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    })
    .expect(400)
  });

  it('/POST signup director with invalid email',async () => {
    const director = fakeData.director();
    director.email = 'test';
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    })
    .expect(400)
  });

  it('/POST signup director with no password',async () => {
    const director = fakeData.director();
    director.password = '';
    return request(app.getHttpServer())
    .post('/auth/directors/signUp')
    .send({
      ...director,
      activationPassword: process.env.ACTIVATION_PASSWORD,
    })
    .expect(400)
  });

  afterAll(async () => {
    await app.close();
  });
});