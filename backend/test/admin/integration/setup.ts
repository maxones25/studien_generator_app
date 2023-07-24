import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../dist/src/apps/admin/app.module';
import { TEST_DIRECTOR } from '../../testData';

const getAccessToken = async (
  app: INestApplication,
  email: string,
  password: string,
) => {
  const res = await request(app.getHttpServer()).post('/auth/login').send({
    email,
    password,
  });
  if (typeof res.body.accessToken !== 'string')
    throw new Error('accessToken invalid');
  return res.body.accessToken;
};

module.exports = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  global.__ACCESS_TOKEN__ = {
    [TEST_DIRECTOR.MAX.EMAIL]: await getAccessToken(
      app,
      TEST_DIRECTOR.MAX.EMAIL,
      TEST_DIRECTOR.MAX.PASSWORD,
    ),
    [TEST_DIRECTOR.JOHN.EMAIL]: await getAccessToken(
      app,
      TEST_DIRECTOR.JOHN.EMAIL,
      TEST_DIRECTOR.JOHN.PASSWORD,
    ),
  };

  global.__APP__ = app;
};
