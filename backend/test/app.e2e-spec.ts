import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { clearDatabase } from './clearDatabase';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await clearDatabase(app);
  });

  it('/POST create new director', () => {
    return request(app.getHttpServer())
      .post('/auth/directors/create')
      .send({ 
        email: "test", 
        firstName: "kai",
        lastName: "mann", 
        password: "12345678", 
        activationPassword: "1234"
      })
      .expect(201)
  });

  it('/POST create same director twice', () => {
    return request(app.getHttpServer())
    .post('/auth/directors/create')
    .send({ 
      email: "test", 
      firstName: "kai",
      lastName: "mann", 
      password: "12345678", 
      activationPassword: "1234"
    })
    .expect(201).then(() => 
    request(app.getHttpServer())
    .post('/auth/directors/create')
    .send({ 
      email: "test", 
      firstName: "kai",
      lastName: "mann", 
      password: "12345678", 
      activationPassword: "1234"
    })
    .expect(500));
  });

  it('/POST login director', () => {
    
  return request(app.getHttpServer())
  .post('/auth/directors/create')
  .send({ 
    email: "test", 
    firstName: "kai",
    lastName: "mann", 
    password: "12345678", 
    activationPassword: "1234"
  })
  .expect(201).then(() => 
  request(app.getHttpServer())
    .post('/auth/directors/login')
    .send({ 
      email: "test", 
      password: "12345678", 
    })
    .expect(201))
  });

  afterAll(async () => {
    await app.close();
  });
});
